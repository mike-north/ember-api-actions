import Ember from 'ember';
import { buildOperationUrl } from './build-url';

const { merge } = Ember;

export default function instanceOp(options) {
    return function(payload) {
        let modelName = this.constructor.modelName || this.constructor.typeKey;
        let requestType = (options.type || 'PUT').toUpperCase();
        let urlType = options.urlType || requestType;
        let adapter = this.store.adapterFor(modelName);
        let fullUrl = buildOperationUrl(this, options.path, urlType);
        let extract = options.extract;
        return adapter.ajax(fullUrl, requestType, merge(options.ajaxOptions || {}, { data: payload })).then(function(response) {
            if (extract) {
                if (response && response[extract] !== null) {
                    return Ember.RSVP.resolve(response[extract]);
                } else {
                    return Ember.RSVP.reject(new Error('Response malformed'));
                }
            } else {
                return Ember.RSVP.resolve(response);
            }
        });
    };
}