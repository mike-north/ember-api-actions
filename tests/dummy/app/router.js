import Ember from 'ember';
import config from './config/environment';

const { Router } = Ember;

const R = Router.extend({
  location: config.locationType
});

R.map(function() {
});

export default R;
