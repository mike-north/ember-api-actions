import { isArray } from '@ember/array';

export default function(options, response) {
  let modelName = this.constructor.modelName || this.constructor.typeKey;
  let modelClass = this.store.modelFor(modelName);
  let serializer = this.store.serializerFor(modelName);
  let normalized = isArray(response.data) ? serializer.normalizeArrayResponse(this.store, modelClass, response) :
      serializer.normalizeSingleResponse(this.store, modelClass, response);
  return this.store.push(normalized);
}
