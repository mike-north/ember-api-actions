import Ember from 'ember';

const { assert } = Ember;

export default function buildOperationUrl(record, opPath, requestType, instance=true) {
  assert('You must provide a path for instanceOp', opPath);
  const modelName = record.constructor.modelName || record.constructor.typeKey;
  let adapter = record.store.adapterFor(modelName);
  let path = opPath;
  let snapshot = record._createSnapshot();
  let baseUrl = adapter.buildURL(modelName, instance ? record.get('id') : null, snapshot, requestType);

  if (baseUrl.charAt(baseUrl.length - 1) === '/') {
    return `${baseUrl}${path}`;
  } else {
    return `${baseUrl}/${path}`;
  }
}
