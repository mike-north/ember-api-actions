import { A } from '@ember/array';
import Controller from '@ember/controller';

export default Controller.extend({
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
      let { id } = fruit.getProperties(['id', 'name']);
      fruit.info({ fruitId: id, harvest: 'yes' });
    },
    ripenAllFruit(fruit) {
      fruit.ripenAll({ test: 'ok' });
    },
    getAllFreshFruit(fruit) {
      fruit.getFresh({ month: 'July', harvest: 'yes' });
    }
  }
  // END-SNIPPET
});
