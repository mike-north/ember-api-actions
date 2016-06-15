import Ember from 'ember';
import buildOperationUrl from './build-url';

const { $ } = Ember;

export default function instanceOp(options) {
  return function(payload) {
    let modelName = this.constructor.modelName || this.constructor.typeKey;
    let requestType = options.type || 'PUT';
    let urlType = options.urlType || requestType;
    let adapter = this.store.adapterFor(modelName);
    let fullUrl = buildOperationUrl(this, options.path, urlType);
    return adapter.ajax(fullUrl, requestType, $.extend({}, options.ajaxOptions, { data: payload }));
  };
}
