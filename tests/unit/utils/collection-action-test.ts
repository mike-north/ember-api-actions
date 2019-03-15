import collectionAction from 'ember-api-actions/utils/collection-action';
import { module, test } from 'qunit';

module('Unit | Utility | collection action', () => {
  // Replace this with your real tests.
  test('it works', assert => {
    const result = collectionAction({ path: '/bar' });
    assert.ok(result);
  });
});
