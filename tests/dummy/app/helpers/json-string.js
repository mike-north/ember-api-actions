import Ember from 'ember';

export function jsonString(params/*, hash*/) {
  return JSON.stringify(params[0]);
}

export default Ember.HTMLBars.makeBoundHelper(jsonString);
