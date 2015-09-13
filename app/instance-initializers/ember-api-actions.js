import { CollectionActionable } from 'ember-api-actions';

export function initialize(application) { }

export default {
  name: 'ember-api-actions',
  initialize: function(application) {

    let store = null;
    let emberVersion = parseFloat(Ember.VERSION);

    if (emberVersion >= 2.1) {
      store = application.lookup('service:store');
    }
    else if (emberVersion >= 1.13) {
      store = application.container.lookup('service:store');
    }
    else {
      store = application.container.lookup('store:application');
    }

    store.reopen(CollectionActionable);
  }
};
