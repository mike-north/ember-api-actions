// BEGIN-SNIPPET fruit-model
import DS from 'ember-data';
import { memberAction, collectionAction } from 'ember-api-actions';

const { attr, Model } = DS;

export default Model.extend({
  name: attr('string'),
  ripen: memberAction({ path: 'doRipen' }),
  info: memberAction({ path: 'info', type: 'get' }),
  ripenAll: collectionAction({ path: 'ripenEverything' }),
  getFresh: collectionAction({ path: 'fresh', type: 'get' })
});
// END-SNIPPET
