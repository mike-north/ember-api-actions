// BEGIN-SNIPPET fruit-model
import DS from 'ember-data';
import { memberAction, collectionAction } from 'ember-api-actions';

const { attr } = DS;

export default DS.Model.extend({
  name:     attr('string'),
  ripen:    memberAction(    { path: 'doRipen' }),
  ripenAll: collectionAction({ path: 'ripenEverything' })
});
// END-SNIPPET
