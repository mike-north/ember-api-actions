import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this._super(...arguments);
    this.set('requests', Ember.A());
  },
  // BEGIN-SNIPPET controller
  actions: {
    ripenFruit(fruit) {
      fruit.ripen({
        startTime: (new Date()).toString()
      });
    },
    ripenAllFruit(fruit) {
      fruit.ripenAll({
        startTime: (new Date()).toString()
      });
    }
  }
  // END-SNIPPET
});
