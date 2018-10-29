import { isArray } from '@ember/array';
import { _getModelClass, _getModelName, _getStoreFromRecord } from './build-url';

export default function serializeAndPush(options, response) {  
  const recordClass = _getModelClass(this);
  const modelName = _getModelName(recordClass);
  const store = _getStoreFromRecord(this);
  const serializer = store.serializerFor(modelName);
  const normalized = isArray(response.data) ? serializer.normalizeArrayResponse(store, recordClass, response) :
      serializer.normalizeSingleResponse(store, recordClass, response);
  return this.store.push(normalized);
}
