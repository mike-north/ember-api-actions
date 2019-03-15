import memberAction from 'ember-api-actions/utils/member-action';
import { module, test } from 'qunit';

module('Unit | Utility | member action', () => {
  // Replace this with your real tests.
  test('it works', assert => {
    const result = memberAction({ path: '/foo' });
    assert.ok(result);
  });
});
