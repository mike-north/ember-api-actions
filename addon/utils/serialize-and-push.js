import { isArray } from '@ember/array';
import { _getModelClass, _getModelName, _getStoreFromRecord } from './build-url';

export default function serializeAndPush(response) {
  const isJsonApi = response.jsonapi && response.jsonapi.version;
  if (!isJsonApi) {
    // eslint-disable-next-line no-console
    console.warn('serializeAndPush may only be used with a JSON API document. Ignoring response. Document must have a mandatory JSON API object. See https://jsonapi.org/format/#document-jsonapi-object.');
    return response;
  }
  
  const recordClass = _getModelClass(this);
  const modelName = _getModelName(recordClass);
  const store = _getStoreFromRecord(this);
  const serializer = store.serializerFor(modelName);
  const normalized = isArray(response.data) ? serializer.normalizeArrayResponse(store, recordClass, response) :
      serializer.normalizeSingleResponse(store, recordClass, response);
  return this.store.push(normalized);
}
