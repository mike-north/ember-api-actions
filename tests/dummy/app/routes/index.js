import Ember from 'ember';
import Pretender from 'pretender';

export default Ember.Route.extend({
  model() {
      return Ember.A(this.store.pushMany('fruit', [{
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
      }, ]));
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
      server.put('/fruits/:id/doRipen', request => {
        let controller = this.get('controller');
        controller.get('requests').addObject({
          url: request.url,
          data: JSON.parse(request.requestBody)
        });
        return [200, {}, '{"status": "ok"}'];
      });
      server.put('/fruits/ripenEverything', request => {
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
