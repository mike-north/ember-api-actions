// BEGIN-SNIPPET fruit-model
import DS from 'ember-data';
import { memberAction, collectionAction } from 'ember-api-actions';
import { assign } from '@ember/polyfills';
import { isArray } from '@ember/array';

const { attr, Model } = DS;

function mergeAttributes(attributes) {
  let payload = this.serialize();
  payload.data.attributes = assign(payload.data.attributes, attributes);
  return payload;
}

// This is an example of how to extract JSON API responses and push
// them into the store.
// TODO extract and export as part of this addon
function serializeAndPush(response) {
  const recordClass = this.constructor;
  const modelName = recordClass.modelName;
  const { store } = this;
  const serializer = store.serializerFor(modelName);
  const normalized = isArray(response.data) ? serializer.normalizeArrayResponse(store, recordClass, response) :
        serializer.normalizeSingleResponse(store, recordClass, response);
  return this.store.push(normalized);
}

export default Model.extend({
  name: attr('string'),
  ripen: memberAction({ path: 'doRipen' }),
  info: memberAction({ path: 'info', type: 'get' }),
  ripenAll: collectionAction({ path: 'ripenEverything' }),
  getFresh: collectionAction({ path: 'fresh', type: 'get' }),
  eat: memberAction({
    path: 'doEat',
    before: mergeAttributes,
    after: serializeAndPush
  }),
  eatAll: collectionAction({
    path: 'doEatAll',
    before: mergeAttributes,
    after: serializeAndPush })
});
// END-SNIPPET
