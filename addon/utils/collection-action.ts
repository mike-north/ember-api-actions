import Model from 'ember-data/model';
import { Value as JSONValue } from 'json-typescript';
import { _getModelClass, _getModelName, _getStoreFromRecord, buildOperationUrl } from './build-url';
import { EmberDataRequestType, Hook, HTTPVerb, strictifyHttpVerb } from './types';

export interface CollectionOperationOptions<IN, OUT> {
  type?: HTTPVerb;
  path: string;
  urlType?: EmberDataRequestType;
  ajaxOptions?: any;
  before?: Hook<IN, any>;
  after?: Hook<any, OUT>;
}

export default function collectionOp<IN = any, OUT = any>(options: CollectionOperationOptions<IN, OUT>) {
  return function runCollectionOp(this: Model, payload: IN): Promise<OUT> {
    const model: Model = this;
    const recordClass = _getModelClass(model);
    const modelName = _getModelName(recordClass);
    const store = _getStoreFromRecord(model);
    const requestType: HTTPVerb = strictifyHttpVerb(options.type || 'put');
    const urlType: EmberDataRequestType = options.urlType || 'updateRecord';
    const adapter = store.adapterFor(modelName);
    const fullUrl = buildOperationUrl(model, options.path, urlType, false);
    const data = (options.before && options.before.call(model, payload)) || payload;
    return adapter
      .ajax(fullUrl, requestType, Object.assign(options.ajaxOptions || {}, { data }))
      .then((response: JSONValue) => {
        if (options.after && !model.isDestroyed) {
          return options.after.call(model, response);
        }

        return response;
      });
  };
}
