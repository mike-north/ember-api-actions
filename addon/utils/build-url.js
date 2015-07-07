import Ember from 'ember';

export default function buildOperationUrl(record, opPath, requestType, intance=true) {
  Ember.assert('You must provide a path for instanceOp', opPath);
  let modelName = record.constructor.modelName;
  let adapter = record.store.adapterFor(modelName);
  let path = opPath;
  let baseUrl = adapter.buildURL(modelName, intance ? record.get('id') : null, requestType);
  
  if (baseUrl.charAt(baseUrl.length-1) === '/') {
    return `${baseUrl}${path}`;
  } else {
    return `${baseUrl}/${path}`;
  }
}
