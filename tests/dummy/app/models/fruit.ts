// BEGIN-SNIPPET fruit-model
import { assign } from '@ember/polyfills';
import { collectionAction, memberAction, serializeAndPush } from 'ember-api-actions';
import DS from 'ember-data';
import { SingleResourceDoc } from 'jsonapi-typescript';

const { attr, Model } = DS;

function mergeAttributes(this: DS.Model, attributes: any) {
  const payload: SingleResourceDoc<'fruit', any> = this.serialize() as any;
  payload.data.attributes = assign(payload.data.attributes || {}, attributes);
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
    before: mergeAttributes,
    after: serializeAndPush
  }),
  eatAll: collectionAction({
    path: 'doEatAll',
    before: mergeAttributes,
    after: serializeAndPush
  })
});
// END-SNIPPET
