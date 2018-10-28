/* eslint-disable no-unused-vars  */
import Model from 'ember-data/model';
import Store from 'ember-data/store';
import { getOwner } from '@ember/application';
import EngineInstance from '@ember/engine/instance';
/**
 * Given a record, obtain the ember-data model class
 * @param {Model} record
 * @return {typeof Model}
 */
export function _getModelClass(record) {
  return /** @type {typeof Model} */ (record.constructor);
}

/**
 * Given an ember-data model class, obtain its name
 * @param {typeof Model} clazz
 * @returns {string}
 */
export function _getModelName(clazz) {
  return (
    // prettier-ignore
    clazz.modelName  // modern use
    // @ts-ignore
     || clazz.typeKey // legacy fallback
  );
}

/**
 * Given an ember-data-record, obtain the related Store
 * @param {Model} record
 * @return {Store}
 */
export function _getStoreFromRecord(record) {
  /** @type {EngineInstance} */
  const owner = getOwner(record);
  return owner.lookup('service:store');
}

/**
 *
 * @param {Model} record
 * @param {string} opPath
 * @param {'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'} urlType
 * @param {boolean} [instance]
 */
export function buildOperationUrl(record, opPath, urlType, instance = true) {
  const modelClass = _getModelClass(record);
  const modelName = _getModelName(modelClass);
  const store = _getStoreFromRecord(record);
  const adapter = store.adapterFor(modelName);
  const path = opPath;
  const snapshot = record._createSnapshot();
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
