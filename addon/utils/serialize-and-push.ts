import { isArray } from '@ember/array';
import { typeOf } from '@ember/utils';
import Model from 'ember-data/model';
import JSONSerializer from 'ember-data/serializers/json';
import SerializerRegistry from 'ember-data/types/registries/serializer';
import { CollectionResourceDoc, Document as JSONApiDoc, DocWithData, SingleResourceDoc } from 'jsonapi-typescript';
import { _getModelClass, _getModelName, _getStoreFromRecord } from './build-url';

function isJsonApi(raw: any): raw is JSONApiDoc {
  return raw.jsonapi && raw.jsonapi.version;
}

function isDocWithData(doc: any): doc is DocWithData {
  return isJsonApi(doc) && ['object', 'array'].indexOf(typeOf((doc as DocWithData).data)) >= 0;
}

export default function serializeAndPush(this: Model, response: any) {
  if (!isDocWithData(response)) {

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
  const normalized = normalizedResponse(this, response, serializer);

  return store.push(normalized);
}

const normalizedResponse = (model: Model, response: any, serializer: JSONSerializer) => {
  if (isArray(response.data)) {
    return normalizedResponseForArray(
      model,
      serializer,
      response as CollectionResourceDoc
    );
  } else {
    return normalizedSingleResponse(
      model,
      serializer,
      response as SingleResourceDoc
    );
  }
}

const normalizedResponseForArray = (model: Model, serializer: JSONSerializer, response: CollectionResourceDoc) => {
  const recordClass = _getModelClass(model);
  const store = _getStoreFromRecord(model);

  return serializer.normalizeArrayResponse(
    store,
    recordClass as any,
    response,
    null as any,
    'findAll'
  );
}

const normalizedSingleResponse = (model: Model, serializer: JSONSerializer, response: SingleResourceDoc) => {
  const recordClass = _getModelClass(model);
  const store = _getStoreFromRecord(model);
  const responseId = response.data.id || '(unknown)';

  return serializer.normalizeSingleResponse(
    store,
    recordClass as any,
    response,
    responseId,
    'findRecord'
  );
}
