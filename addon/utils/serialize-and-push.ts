import { isArray } from '@ember/array';
import { typeOf } from '@ember/utils';
import Model from 'ember-data/model';
import JSONSerializer from 'ember-data/serializers/json';
import SerializerRegistry from 'ember-data/types/registries/serializer';
import { CollectionResourceDoc, Document as JSONApiDoc, DocWithData, SingleResourceDoc } from 'jsonapi-typescript';
import { _getModelClass, _getModelName, _getStoreFromRecord } from './build-url';

function isValidResponse(doc: any): doc is DocWithData {
  // If the document has this signature we can trust what we're about to receive
  if (doc.jsonapi && doc.jsonapi.version) {
    return true
  }
  
  console.debug("Received a repsonse that doesn't have a /jsonapi/version property")

  // Don't even bother if the data propery doesn't exist
  return typeof response.data !== 'undefined';
}

export default function serializeAndPush(this: Model, response: any) {
  if (!isValidResponse(response)) {
    // tslint:disable-next-line:no-console
    console.warn(
      'serializeAndPush may only be used with a JSON API document. Ignoring response. ' +
        'Document must have a mandatory JSON API object. See https://jsonapi.org/format/#document-jsonapi-object.'
    );
    return response;
  }

  const recordClass = _getModelClass(this);
  const modelName = _getModelName(recordClass);
  const store = _getStoreFromRecord(this);
  const serializer: JSONSerializer = store.serializerFor(modelName as keyof SerializerRegistry);
  let normalized: {};
  if (isArray(response.data)) {
    const doc = response as CollectionResourceDoc;
    normalized = serializer.normalizeArrayResponse(store, recordClass as any, doc, null as any, 'findAll');
  } else {
    const doc = response as SingleResourceDoc;
    normalized = serializer.normalizeSingleResponse(
      store,
      recordClass as any,
      doc,
      `${doc.data.id || '(unknown)'}`,
      'findRecord'
    );
  }
  return store.push(normalized);
}
