import { click, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';
import setupPretender from '../helpers/setup-pretender';

module('Acceptance | index2', hooks => {
  setupApplicationTest(hooks);
  setupPretender(hooks);

  test('visiting /', async function(assert) {
    await visit('/');
    assert.expect(8);

    this.server.put('/fruits/:id/doRipen', (request) => {
      const data = JSON.parse(request.requestBody);
      assert.deepEqual(data, { id: '1', name: 'apple' }, 'member action - request payload is correct');
      assert.equal(request.params.id, '1', 'request made to the right URL');
      return [200, {}, '{"status": "ok"}'];
    });

    this.server.put('/fruits/ripenEverything', (request) => {
      const data = JSON.parse(request.requestBody);
      assert.deepEqual(data, { test: 'ok' }, 'collection action - request payload is correct');
      assert.ok(true, 'request was made to "ripenEverything"');
      return [200, {}, '{"status": "ok"}'];
    });

    this.server.get('/fruits/:id/info', (request) => {
      assert.equal(request.params.id, '1', 'request made to the right URL');
      assert.equal(request.queryParams.fruitId, '1', 'request made with the right query params');
      return [200, {}, '{"status": "ok"}'];
    });

    this.server.get('/fruits/fresh', (request) => {
      assert.equal(request.queryParams.month, 'July', 'request made with the right query params');
      assert.ok(true, 'request was made to "ripenEverything"');
      return [200, {}, '{"status": "ok"}'];
    });

    await click('#apple .ripen-instance-button');

    await click('.all-fruit .ripen-type-button');

    await click('#apple .info-instance-button');

    await click('.all-fruit .fresh-type-button');
  });

  test('before/after hooks and serializeAndPush helper', async function(assert) {
    await visit('/');
    assert.expect(6);

    this.server.put('/fruits/:id/doEat', (request) => {
      const data = JSON.parse(request.requestBody);

      const expectedData = {
        data: {
          type: 'fruits',
          attributes: {
            name: 'apple',
            was_eaten: true
          }
        }
      };

      assert.deepEqual(data, expectedData, 'collection action - request payload run through serialize function');
      assert.equal(request.params.id, '1', 'request was made to the right URL');
      const response = {
        jsonapi: { version: '1.0' },
        data: {
          id: 1,
          type: 'fruit',
          attributes: {
            name: 'Eaten apple'
          }
        }
      };
      return [200, {}, JSON.stringify(response)];
    });

    this.server.put('/fruits/doEatAll', (request) => {
      const data = JSON.parse(request.requestBody);

      const expectedData = {
        data: {
          type: 'fruits',
          attributes: {
            name: 'Eaten apple',
            was_eaten: true
          }
        }
      };

      assert.deepEqual(data, expectedData, 'collection action - request payload run through serialize function');

      const response = {
        jsonapi: { version: '1.0' },
        data: [
          {
            id: 1,
            type: 'fruit',
            attributes: {
              name: 'Completely Eaten apple'
            }
          }
        ]
      };
      return [200, {}, JSON.stringify(response)];
    });

    (assert as any).dom(`[data-test-fruit-name="apple"]`).exists();

    await click('#apple .eat-instance-button');

    (assert as any).dom(`[data-test-fruit-name="Eaten apple"]`).exists();

    await click('.all-fruit .eat-all-button');

    (assert as any).dom(`[data-test-fruit-name="Completely Eaten apple"]`).exists();
  });
});
