// BEGIN-SNIPPET vegatable-model
import DS from 'ember-data';
import { collectionAction, memberAction } from 'ember-api-actions';

const { attr, Model } = DS;

const Vegatable = Model.extend({
  name: attr('string'),
  info: memberAction({ path: 'info', type: 'get' }),
  moreInfo: memberAction({ path: 'moreInfo?more=true', type: 'get' }),
  allInfo: collectionAction({ path: 'allInfo?less=false', type: 'get' }),
});

export default Vegatable;
// END-SNIPPET
