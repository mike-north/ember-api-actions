import { merge } from '@ember/polyfills';
import { buildOperationUrl } from './build-url';

export default function instanceOp(options) {
  return function(payload) {
    let modelName = this.constructor.modelName || this.constructor.typeKey;
    let requestType = (options.type || 'PUT').toUpperCase();
    let urlType = options.urlType || requestType;
    let adapter = this.store.adapterFor(modelName);
    let fullUrl = buildOperationUrl(this, options.path, urlType, false, payload);
    return adapter.ajax(fullUrl, requestType, merge(options.ajaxOptions || {}, { data: payload }));
  };
}
