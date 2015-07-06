import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../../tests/helpers/start-app';
import Pretender from 'pretender';


let application;
let server;

module('Acceptance | index', {
  beforeEach: function() {
    application = startApp();
    server = new Pretender();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    server.shutdown();
  }
});

test('visiting /', function(assert) {
  visit('/');
  assert.expect(3);
  server.put('/fruits/:id/doRipen', function (request) {
    assert.equal(request.url, '/fruits/1/doRipen', 'request was made to "doRipen"');
    return [200, {}, '{"status": "ok"}'];
  });

  server.put('/fruits/ripenEverything', function (request) {
    assert.ok(true, 'request was made to "ripenEverything"');
    return [200, {}, '{"status": "ok"}'];
  });

  andThen(function() {
    click('#apple .ripen-instance-button');
    assert.equal(currentURL(), '');
  });

  andThen(function() {
    click('.all-fruit .ripen-type-button');
  });

});

