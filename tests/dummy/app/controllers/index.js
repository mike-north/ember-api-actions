import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this._super(...arguments);
    this.set('requests', Ember.A());
  },
  // BEGIN-SNIPPET controller
  actions: {
    ripenFruit(fruit) {
      fruit.ripen(
        fruit.getProperties(['id', 'name'])
      );
    },
    ripenAllFruit() {
      this.store.collectionAction('fruit', 'ripenAll', { test: 'ok' });
    }
  }
  // END-SNIPPET
});
