import Ember from 'ember';

const { assert } = Ember;

export default function buildOperationUrl(record, opPath, requestType, intance=true) {
  assert('You must provide a path for instanceOp', opPath);
  const modelName = record.constructor.modelName || record.constructor.typeKey;
  let adapter = record.store.adapterFor(modelName);
  let path = opPath;
  let baseUrl = adapter.buildURL(modelName, intance ? record.get('id') : null, requestType);

  if (baseUrl.charAt(baseUrl.length - 1) === '/') {
    return `${baseUrl}${path}`;
  } else {
    return `${baseUrl}/${path}`;
  }
}
