import { isArray } from '@ember/array';
import Helper from '@ember/component/helper';
import Ember from 'ember';

const { HTMLBars } = Ember;

export function firstInArray(params /* , hash*/) {
  if (isArray(params[0])) {
    return params[0].objectAt(0) || undefined;
  } else {
    return undefined;
  }
}

let forExport = null;

if (Helper) {
  forExport = Helper.helper(firstInArray);
} else if (HTMLBars.makeBoundHelper) {
  forExport = HTMLBars.makeBoundHelper(firstInArray);
}

export default forExport;
