import Ember from 'ember';

export default Ember.Mixin.create({

  collectionAction(modelName, method, params) {
    let instance = this.createRecord(modelName);
    return instance[method](params);
  }

});
