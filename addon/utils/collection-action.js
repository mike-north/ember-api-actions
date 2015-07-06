import Ember from 'ember';
import buildOperationUrl from './build-url';

export default function instanceOp(options) {
  return function(payload) {
    let requestType = options.type || 'PUT';
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    let fullUrl = buildOperationUrl(this, options.path, requestType, false);
    return adapter.ajax(fullUrl, requestType, Ember.$.extend(options.ajaxOptions || {}, { data: payload }));
  };
}