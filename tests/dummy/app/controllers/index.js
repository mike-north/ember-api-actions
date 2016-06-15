import Ember from 'ember';

const { Controller, A } = Ember;

export default Controller.extend({
  init() {
    this._super(...arguments);
    this.set('requests', A());
  },
  // BEGIN-SNIPPET controller
  actions: {
    ripenFruit(fruit) {
      fruit.ripen(
        fruit.getProperties(['id', 'name'])
      );
    },
    ripenAllFruit(fruit) {
      fruit.ripenAll({ test: 'ok' });
    }
  }
  // END-SNIPPET
});
