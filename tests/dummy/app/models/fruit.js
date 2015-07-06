// BEGIN-SNIPPET fruit-model
import DS from 'ember-data';
import { instanceOp, classOp } from 'ember-api-actions';

const { attr } = DS;

export default DS.Model.extend({
  name: attr('string'),
  ripen: instanceOp({ path: 'doRipen' }),
  ripenAll: classOp({ path: 'ripenEverything' })
});
// END-SNIPPET
