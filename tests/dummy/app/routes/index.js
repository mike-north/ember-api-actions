import Ember from 'ember';
import Pretender from 'pretender';

const LEGACY_PAYLOAD = {
  'fruit': [
    {
      id: 1,
      name: 'apple'
    }, {
      id: 2,
      name: 'pear'
    }, {
      id: 3,
      name: 'orange'
    }, {
      id: 4,
      name: 'grape'
    }
  ]
};

const PAYLOAD = {
  data: [{
    type: 'fruit',
    id: 1,
    attributes: {
      name: 'apple'
    }
  }, {
    type: 'fruit',
    id: 2,
    attributes: {
      name: 'pear'
    }
  }, {
    type: 'fruit',
    id: 3,
    attributes: {
      name: 'orange'
    }
  }, {
    type: 'fruit',
    id: 4,
    attributes: {
      name: 'grape'
    }
  }]
};

export default Ember.Route.extend({

  model() {
    let arr = [];
    this.store.pushPayload('fruit', !this.store.peekAll ? LEGACY_PAYLOAD : PAYLOAD);
    if (!this.store.peekAll) {
      arr = [1, 2, 3, 4].map((id) => this.store.getById('fruit', id));
    } else {
      arr = this.store.peekAll('fruit');
    }
    return Ember.A(arr);
    // return this.get('store').findAll('fruit');
  },

  beforeModel() {
    this._super(...arguments);
    if (!Ember.testing) {
      this._setupPretender();
    }
  },
  deactivate() {
    this._super(...arguments);
  },
  _setupPretender() {
    let server = new Pretender();
    // server.get('/fruits', request => {
    //   return [200, {}, JSON.stringify({
    //     fruits:
    //   })];
    // });
    server.put('/fruits/:id/doRipen', (request) => {
      let controller = this.get('controller');
      controller.get('requests').addObject({
        url: request.url,
        data: JSON.parse(request.requestBody)
      });
      return [200, {}, '{"status": "ok"}'];
    });
    server.put('/fruits/ripenEverything', (request) => {
      let controller = this.get('controller');
      controller.get('requests').addObject({
        url: request.url,
        data: JSON.parse(request.requestBody)
      });
      return [200, {}, '{"status": "ok"}'];
    });
    this.set('server', server);
  },
  _teardownPretender() {
    this.get('server').shutdown();
  }
});
