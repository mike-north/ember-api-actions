import { merge } from '@ember/polyfills';
import { buildOperationUrl, _getStoreFromRecord, _getModelName, _getModelClass } from './build-url';

export default function instanceOp(options) {
  return function(payload) {
    const recordClass = _getModelClass(this);
    const modelName = _getModelName(recordClass);
    const store = _getStoreFromRecord(this);
    const requestType = (options.type || 'PUT').toUpperCase();
    const urlType = options.urlType || requestType;
    const adapter = store.adapterFor(modelName);
    const fullUrl = buildOperationUrl(this, options.path, urlType, false);
    const data = (options.before && options.before.call(this, payload)) || payload;
    return adapter.ajax(fullUrl, requestType, merge(options.ajaxOptions || {}, { data })).then(response => {
      if (options.after && !this.isDestroyed) {
        return options.after.call(this, response);
      }

      return response;
    });
  };
}
