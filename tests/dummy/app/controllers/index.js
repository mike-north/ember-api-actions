import Ember from 'ember';

const { Controller, A } = Ember;

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('requests', A([]));
  },
  // BEGIN-SNIPPET controller
  actions: {
    ripenFruit(fruit) {
      fruit.ripen(
        fruit.getProperties(['id', 'name'])
      );
    },
    fruitInfo(fruit) {
      let { id } = fruit.getProperties(['id', 'name']);
      fruit.info({ fruitId: id });
    },
    ripenAllFruit(fruit) {
      fruit.ripenAll({ test: 'ok' });
    },
    getAllFreshFruit(fruit) {
      fruit.getFresh({ month: 'July' });
    }
  }
  // END-SNIPPET
});
