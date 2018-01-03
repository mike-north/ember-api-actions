import Helper from '@ember/component/helper';
import Ember from 'ember';

const { HTMLBars } = Ember;

export function jsonString(params /* , hash*/) {
  return JSON.stringify(params[0]);
}

let forExport = null;

if (Helper) {
  forExport = Helper.helper(jsonString);
} else if (HTMLBars.makeBoundHelper) {
  forExport = HTMLBars.makeBoundHelper(jsonString);
}

export default forExport;
