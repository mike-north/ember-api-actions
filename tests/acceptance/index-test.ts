import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Pretender from 'pretender';

module('Acceptance | index2', function(hooks) {
  setupApplicationTest(hooks);
  let server;
  hooks.beforeEach(() => {
    server = new Pretender();
  });
  hooks.afterEach(() => {
    server.shutdown();
  });

  test('visiting /', async function(assert) {
    await visit('/');
    assert.expect(8);

    server.put('/fruits/:id/doRipen', request => {
      let data = JSON.parse(request.requestBody);
      assert.deepEqual(data, { id: '1', name: 'apple' }, 'member action - request payload is correct');
      assert.equal(request.url, '/fruits/1/doRipen', 'request was made to "doRipen"');
      return [200, {}, '{"status": "ok"}'];
    });

    server.put('/fruits/ripenEverything', request => {
      let data = JSON.parse(request.requestBody);
      assert.deepEqual(data, { test: 'ok' }, 'collection action - request payload is correct');
      assert.ok(true, 'request was made to "ripenEverything"');
      return [200, {}, '{"status": "ok"}'];
    });

    server.get('/fruits/:id/info', request => {
      assert.equal(request.url, '/fruits/1/info?fruitId=1');
      assert.ok(true, 'request was made to "ripenEverything"');
      return [200, {}, '{"status": "ok"}'];
    });

    server.get('/fruits/fresh', request => {
      assert.equal(request.url, '/fruits/fresh?month=July');
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
    assert.expect(7);

    server.put('/fruits/:id/doEat', request => {
      let data = JSON.parse(request.requestBody);

      let expectedData = {
        data: {
          type: 'fruits',
          attributes: {
            name: 'apple',
            was_eaten: true
          }
        }
      };

      assert.deepEqual(data, expectedData, 'collection action - request payload run through serialize function');
      assert.equal(request.url, '/fruits/1/doEat', 'request was made to "doEat"');
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

    server.put('/fruits/doEatAll', request => {
      let data = JSON.parse(request.requestBody);

      let expectedData = {
        data: {
          type: 'fruits',
          attributes: {
            name: 'Eaten apple',
            was_eaten: true
          }
        }
      };

      assert.deepEqual(data, expectedData, 'collection action - request payload run through serialize function');
      assert.equal(request.url, '/fruits/doEatAll', 'request was made to "doEatAll"');

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
