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
});
