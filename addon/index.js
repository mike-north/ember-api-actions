import Ember from 'ember';

const buildOperationUrl = function buildOperationUrl(record, opPath, requestType, intance=true) {
  Ember.assert('You must provide a path for instanceOp', opPath);
  let modelName = record.constructor.modelName;
  let adapter = record.store.adapterFor(modelName);
  let path = opPath;
  let baseUrl = adapter.buildURL(modelName, intance ? record.get('id') : null, requestType);
  return `${baseUrl}/${path}`;
};

export const instanceOp = function instanceOp(options) {
  return function(payload) {
    let requestType = options.type || 'PUT';
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    let fullUrl = buildOperationUrl(this, options.path, requestType);
    let ajaxOptions = adapter.ajaxOptions(fullUrl, requestType, { data: payload });
    return adapter.ajax(fullUrl, requestType, Ember.$.extend(options.ajaxOptions || {}, ajaxOptions));
  };
};

export const classOp = function instanceOp(options) {
  return function(payload) {
    let requestType = options.type || 'PUT';
    let modelName = this.constructor.modelName;
    let adapter = this.store.adapterFor(modelName);
    let fullUrl = buildOperationUrl(this, options.path, requestType, false);
    let ajaxOptions = adapter.ajaxOptions(fullUrl, requestType, { data: payload });
    return adapter.ajax(fullUrl, requestType, Ember.$.extend(options.ajaxOptions || {}, ajaxOptions));
  };
};

export default { classOp, instanceOp };
