import Ember from 'ember';

export default function buildOperationUrl(record, opPath, requestType, intance=true) {
  Ember.assert('You must provide a path for instanceOp', opPath);
  let modelName = record.constructor.modelName;
  let adapter = record.store.adapterFor(modelName);
  let path = opPath;
  let baseUrl = adapter.buildURL(modelName, intance ? record.get('id') : null, requestType);
  return `${baseUrl}/${path}`;
}
