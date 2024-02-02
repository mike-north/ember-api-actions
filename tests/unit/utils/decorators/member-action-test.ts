import { memberAction } from 'ember-api-actions/decorators';
import DS from 'ember-data';
import { setupTest } from 'ember-qunit';
import { TestContext } from 'ember-test-helpers';
import { module, test } from 'qunit';
import setupPretender from '../../../helpers/setup-pretender';

const { Model, attr } = DS;

class Fruit extends Model {
  @attr('string')
  public name?: string;

  @memberAction({ path: 'doRipen' })
  public ripen: any;
}

module('Unit | Utility | decorators/member-action', (hooks) => {
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
    assert.expect(4);

    this.server.put('/fruits/:id/doRipen', (request) => {
      const data = JSON.parse(request.requestBody);
      assert.deepEqual(data, { id: '1', name: 'apple' }, 'member action - request payload is correct');
      assert.equal(request.params.id, '1', 'request was made to the right ID');
      return [200, {}, '{"status": "ok"}'];
    });

    assert.equal(typeof fruit.ripen, 'function', 'Assigns a method on the type');

    const { id, name } = fruit;
    const result = await fruit.ripen({ id, name });

    assert.deepEqual(result, { status: 'ok' }, 'Passes through the API response');
  });
});
