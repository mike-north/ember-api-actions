import customAction from './custom-action';

export default function(options) {
  return function(payload) {
    return customAction(this, options, payload, false);
  };
}
