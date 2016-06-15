import Ember from 'ember';

export function jsonString(params/*, hash*/) {
  return JSON.stringify(params[0]);
}

let forExport = null;

// jscs:disable disallowDirectPropertyAccess
if (Ember.Helper) {
  forExport = Ember.Helper.helper(jsonString);
} else if (Ember.HTMLBars.makeBoundHelper) {
  forExport = Ember.HTMLBars.makeBoundHelper(jsonString);
}
// jscs:enable disallowDirectPropertyAccess

export default forExport;
