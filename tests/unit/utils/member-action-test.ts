import memberAction from 'ember-api-actions/utils/member-action';
import { module, test } from 'qunit';

module('Unit | Utility | member action', function() {
  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = memberAction({ path: '/foo' });
    assert.ok(result);
  });
});
