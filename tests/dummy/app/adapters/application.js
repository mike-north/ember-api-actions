import DS from 'ember-data';

const { JSONAPIAdapter, RESTAdapter } = DS;

export default (JSONAPIAdapter || RESTAdapter).extend({

  buildURL(modelName, id, snapshot, requestType, queryParams) {
    // For testing, to make sure that queryParams are passed to buildURL
    if(queryParams && queryParams.harvest === 'yes') {
      queryParams.harvest = true;
    }
    return this._super(...arguments);
  }
});
