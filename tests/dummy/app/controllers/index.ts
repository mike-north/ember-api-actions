import { A } from '@ember/array';
import Controller from '@ember/controller';
import Fruit from '../models/fruit';

export default Controller.extend({
  requests: [] as any[],
  init() {
    this._super(...arguments);
    this.set('requests', A([]));
  },
  // BEGIN-SNIPPET controller
  actions: {
    ripenFruit(fruit: InstanceType<typeof Fruit>) {
      fruit.ripen(fruit.getProperties(['id', 'name']));
    },
    fruitInfo(fruit: InstanceType<typeof Fruit>) {
      const { id } = fruit.getProperties(['id', 'name']);
      fruit.info({ fruitId: id });
    },
    ripenAllFruit(fruit: InstanceType<typeof Fruit>) {
      fruit.ripenAll({ test: 'ok' });
    },
    getAllFreshFruit(fruit: InstanceType<typeof Fruit>) {
      fruit.getFresh({ month: 'July' });
    },
    eatFruit(fruit: InstanceType<typeof Fruit>) {
      fruit.eat({ was_eaten: true });
    },
    eatAll(fruit: InstanceType<typeof Fruit>) {
      fruit.eatAll({ was_eaten: true });
    }
  }
  // END-SNIPPET
});
