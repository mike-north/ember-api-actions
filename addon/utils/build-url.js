import Ember from 'ember';

/* global UriTemplate */
const { assert } = Ember;

export default function buildOperationUrl(record, opPath, urlType, instance=true) {
  assert('You must provide a path for instanceOp', opPath);
  let modelName = record.constructor.modelName || record.constructor.typeKey;
  let adapter = record.store.adapterFor(modelName);
  let path = opPath;
  let snapshot = record._createSnapshot();
  let baseUrl = adapter.buildURL(modelName, instance ? record.get('id') : null, snapshot, urlType);
  let url = "";
  if (baseUrl.charAt(baseUrl.length - 1) === '/') {
    url = `${baseUrl}${path}`;
  } else {
    url = `${baseUrl}/${path}`;
  }
  let template = new UriTemplate(url);
  let templateResolver = snapshot;

  return template.fill(function(name){
    var result = record.get(name);

    return result;
  });
}
