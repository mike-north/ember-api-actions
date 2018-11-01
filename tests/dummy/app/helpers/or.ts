import Helper from '@ember/component/helper';
import Ember from 'ember';

const { HTMLBars } = Ember as any;

export function or([a, b] /* , hash*/) {
  return a || b;
}

let forExport = null;

if (Helper) {
  forExport = Helper.helper(or);
} else if (HTMLBars.makeBoundHelper) {
  forExport = HTMLBars.makeBoundHelper(or);
}

export default forExport;
