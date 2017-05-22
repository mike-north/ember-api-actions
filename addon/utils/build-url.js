import Ember from 'ember';

const { assert } = Ember;

export function buildOperationUrl(record, opPath, urlType, instance = true) {
  assert('You must provide a path for instanceOp', opPath);
  let modelName = record.constructor.modelName || record.constructor.typeKey;
  let adapter = record.store.adapterFor(modelName);
  let path = opPath;
  let snapshot = record._createSnapshot();
  let baseUrl = adapter.buildURL(modelName, instance ? record.get('id') : null, snapshot, urlType);

  if (baseUrl.charAt(baseUrl.length - 1) === '/') {
    return `${baseUrl}${path}`;
  } else {
    return `${baseUrl}/${path}`;
  }
}

export default buildOperationUrl;
