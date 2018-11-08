import { A } from '@ember/array';
import Controller from '@ember/controller';
import Fruit from '../models/fruit';

export default Controller.extend({
  requests: [],
  init() {
    this._super(...arguments);
    this.set('requests', A([]));
  },
  // BEGIN-SNIPPET controller
  actions: {
    ripenFruit(fruit) {
      fruit.ripen(fruit.getProperties(['id', 'name']));
    },
    fruitInfo(fruit) {
      const { id } = fruit.getProperties(['id', 'name']);
      fruit.info({ fruitId: id });
    },
    ripenAllFruit(fruit) {
      fruit.ripenAll({ test: 'ok' });
    },
    getAllFreshFruit(fruit) {
      fruit.getFresh({ month: 'July' });
    },
    eatFruit(fruit) {
      fruit.eat({ was_eaten: true });
    },
    eatAll(fruit) {
      fruit.eatAll({ was_eaten: true });
    },
    juiceAllFruit(fruit) {
      Fruit.juiceAll({ was_eaten: true });
    }
  }
  // END-SNIPPET
});
