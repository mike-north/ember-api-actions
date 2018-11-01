import DS from 'ember-data';

const { JSONAPIAdapter, RESTAdapter } = DS;

export default (JSONAPIAdapter || RESTAdapter).extend({});
