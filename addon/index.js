import ajax from 'ic-ajax';

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
    let fullUrl = buildOperationUrl(this, options.path, requestType);
    return ajax(Ember.$.extend(options.ajaxOptions || {}, {
      type: requestType,
      url: fullUrl,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(payload)
    }));
  };
};

export const classOp = function instanceOp(options) {
  return function(payload) {
    let requestType = options.type || 'PUT';
    let fullUrl = buildOperationUrl(this, options.path, requestType, false);
    return ajax(Ember.$.extend(options.ajaxOptions || {}, {
      type: requestType,
      url: fullUrl,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(payload)
    }));
  };
};

export default { classOp, instanceOp };
