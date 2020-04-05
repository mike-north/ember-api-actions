import { collectionAction } from 'ember-api-actions/decorators';
import DS from 'ember-data';
import { setupTest } from 'ember-qunit';
import { TestContext } from 'ember-test-helpers';
import { module, test } from 'qunit';
import setupPretender from '../../../helpers/setup-pretender';

const { Model, attr } = DS;

class Fruit extends Model {
  @attr('string')
  public name?: string;

  @collectionAction({ path: 'ripenEverything' })
  public ripenAll: any;
}

module('Unit | Utility | decorators/collection-action', (hooks) => {
  setupTest(hooks);
  setupPretender(hooks);

  let fruit: Fruit;

  hooks.beforeEach(function(this: TestContext) {
    this.owner.unregister('model:fruit');
    this.owner.register('model:fruit', Fruit);

    this.store = this.owner.lookup('service:store');

    fruit = this.store.createRecord('fruit', {
      id: 1,
      name: 'apple'
    });
  });

  test('it adds a method through a decorator', async function(assert) {
    assert.expect(3);

    this.server.put('/fruits/ripenEverything', (request) => {
      const data = JSON.parse(request.requestBody);
      assert.deepEqual(data, { test: 'ok' }, 'collection action - request payload is correct');
      return [200, {}, '{"status": "ok"}'];
    });

    assert.equal(typeof fruit.ripenAll, 'function', 'Assigns a method on the type');

    const result = await fruit.ripenAll({ test: 'ok' });

    assert.deepEqual(result, { status: 'ok' }, 'Passes through the API response');
  });
});
