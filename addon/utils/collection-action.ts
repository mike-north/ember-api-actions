import { assign } from '@ember/polyfills';
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
  return async function runCollectionOp(this: Model, payload: IN): Promise<OUT> {
    const {
      ajaxOptions,
      path,
      before,
      after,
      type = 'put',
      urlType = 'updateRecord'
    } = options;

    const recordClass = _getModelClass(this);
    const modelName = _getModelName(recordClass);
    const store = _getStoreFromRecord(this);
    const requestType: HTTPVerb = strictifyHttpVerb(type);
    const adapter = store.adapterFor(modelName);
    const fullUrl = buildOperationUrl(this, path, urlType, false);
    const requestOptions = combineOptions(this, payload, before, ajaxOptions);

    const response = await adapter.ajax(fullUrl, requestType, requestOptions);
    return handleResponse(this, response, after);
  };
}

const combineOptions = (model: Model, payload: any, before: any, ajaxOptions: any) => {
  const data = (before && before.call(model, payload)) || payload;
  return assign(ajaxOptions || {}, { data });
}

const handleResponse = (model: Model, response: JSONValue, after: any) => {
  if (after && !model.isDestroyed) {
    return after.call(model, response);
  }

  return response;
}
