import { getOwner } from '@ember/application';
import DS from 'ember-data';
import Model from 'ember-data/model';
import { EmberDataRequestType } from './types';

/**
 * Given a record, obtain the ember-data model class
 * @param record
 */
export function _getModelClass<M extends typeof Model>(record: InstanceType<M>): M {
  return record.constructor as M;
}

/**
 * Given an ember-data model class, obtain its name
 * @param clazz
 */
export function _getModelName(clazz: typeof Model): string {
  return (
    // prettier-ignore
    clazz.modelName  // modern use
    // @ts-ignore
     || clazz.typeKey // legacy fallback
  );
}

/**
 * Given an ember-data-record, obtain the related Store
 * @param record
 */
export function _getStoreFromRecord(record: Model) {
  const owner = getOwner(record);
  return owner.lookup('service:store');
}

function snapshotFromRecord(model: Model): DS.Snapshot {
  return (model as any)._createSnapshot();
}

/**
 *
 * @param record
 * @param opPath
 * @param urlType
 * @param instance
 */
export function buildOperationUrl<M extends Model>(
  record: M,
  opPath: string,
  urlType: EmberDataRequestType,
  instance = true
) {
  const modelClass = _getModelClass(record);
  const modelName = _getModelName(modelClass);
  const store = _getStoreFromRecord(record);
  const adapter = store.adapterFor(modelName);
  const path = opPath;
  const snapshot = snapshotFromRecord(record);
  const baseUrl = adapter.buildURL(modelName, instance ? record.get('id') : null, snapshot, urlType);

  if (!path) {
    return baseUrl;
  }

  if (baseUrl.charAt(baseUrl.length - 1) === '/') {
    return `${baseUrl}${path}`;
  } else {
    return `${baseUrl}/${path}`;
  }
}

export default buildOperationUrl;
