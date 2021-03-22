import { assign } from '@ember/polyfills';
import Model from 'ember-data/model';
import { Value as JSONValue } from 'json-typescript';
import { _getModelClass, _getModelName, _getStoreFromRecord, buildOperationUrl } from './build-url';
import { EmberDataRequestType, Hook, HTTPVerb, strictifyHttpVerb } from './types';

export interface InstanceOperationOptions<IN, OUT> {
  type?: HTTPVerb;
  path: string;
  urlType?: EmberDataRequestType;
  ajaxOptions?: any;
  before?: Hook<IN, any>;
  after?: Hook<any, OUT>;
}

export default function instanceOp<IN = any, OUT = any>(options: InstanceOperationOptions<IN, OUT>) {
  return function runInstanceOp(
    this: Model,
    payload: IN,
    instanceOptions:any = {}
  ): Promise<OUT> {
    const recordClass = _getModelClass(this);
    const modelName = _getModelName(recordClass);
    const store = _getStoreFromRecord(this);
    const { ajaxOptions, path, before, after, type = 'put', urlType = 'updateRecord' } = options;
    const requestType: HTTPVerb = strictifyHttpVerb(type);
    const adapter = store.adapterFor(modelName);
    const fullUrl = buildOperationUrl(this, path, urlType, instanceOptions.adapterOptions);
    const data = (before && before.call(this, payload)) || payload;
    return adapter.ajax(fullUrl, requestType, assign(ajaxOptions || {}, { data })).then((response: JSONValue) => {
      if (after && !this.isDestroyed) {
        return after.call(this, response);
      }

      return response;
    });
  };
}
