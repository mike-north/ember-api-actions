// BEGIN-SNIPPET fruit-model
import DS from 'ember-data';
import { memberAction, collectionAction } from 'ember-api-actions';
import { assign } from '@ember/polyfills';

const { attr, Model } = DS;

function mergeAttributes(attributes) {
  let payload = this.serialize();
  payload.data.attributes = assign(payload.data.attributes, attributes);
  return payload;
}

export default Model.extend({
  name: attr('string'),
  ripen: memberAction({ path: 'doRipen' }),
  info: memberAction({ path: 'info', type: 'get' }),
  ripenAll: collectionAction({ path: 'ripenEverything' }),
  getFresh: collectionAction({ path: 'fresh', type: 'get' }),
  eat: memberAction({
    path: 'doEat',
    before: mergeAttributes
  }),
  eatAll: collectionAction({
    path: 'doEatAll',
    before: mergeAttributes })
});
// END-SNIPPET
