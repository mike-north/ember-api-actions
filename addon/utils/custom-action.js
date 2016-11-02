import Ember from 'ember';
import buildUrl from './build-url';
import normalizePayload from './normalize-payload';
import defaultConfig from '../config';

const { assign, getOwner } = Ember;

function ajaxData(config, payload) {
  let data = normalizePayload((payload instanceof Object) ? payload : {}, config.normalizeOperation);
  return assign(config.ajaxOptions, { data });
}

function appConfig(model) {
  return getOwner(model).resolveRegistration('config:environment')['ember-api-actions'] || {};
}

export default function(model, options, payload, instance) {
  let modelName = model.constructor.modelName || model.constructor.typeKey;
  let adapter =  model.store.adapterFor(modelName);
  let serializer =  model.store.serializerFor(modelName);
  let config = assign(defaultConfig, appConfig(model), options);

  let requestType = config.type.toUpperCase();
  let urlType = config.urlType || requestType;
  let url = buildUrl(model, config.path, urlType, instance);
  let data = ajaxData(config, payload);

  return adapter.ajax(url, requestType, data).then((response) => {
    return config.pushToStore ? serializer.pushPayload(model.store, response) : response;
  });
}
