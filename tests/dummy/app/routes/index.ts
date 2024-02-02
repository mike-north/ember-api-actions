import { A } from '@ember/array';
import Route from '@ember/routing/route';
import Ember from 'ember';
import Pretender from 'pretender';

const { testing } = Ember;

const LEGACY_FRUIT_PAYLOAD = {
  fruit: [
    {
      id: 1,
      name: 'apple'
    },
    {
      id: 2,
      name: 'pear'
    },
    {
      id: 3,
      name: 'orange'
    },
    {
      id: 4,
      name: 'grape'
    }
  ]
};

const LEGACY_VEGATABLE_PAYLOAD = {
  vegatable: [
    {
      id: 1,
      name: 'potato',
    },
    {
      id: 2,
      name: 'carrot',
    }
  ]
}

const FRUIT_PAYLOAD = {
  data: [
    {
      type: 'fruit',
      id: 1,
      attributes: {
        name: 'apple'
      }
    },
    {
      type: 'fruit',
      id: 2,
      attributes: {
        name: 'pear'
      }
    },
    {
      type: 'fruit',
      id: 3,
      attributes: {
        name: 'orange'
      }
    },
    {
      type: 'fruit',
      id: 4,
      attributes: {
        name: 'grape'
      }
    },
  ]
};

const VEGATABLE_PAYLOAD = {
  data: [
    {
      type: 'vegatable',
      id: 1,
      attributes: {
        name: 'potato'
      }
    },
    {
      type: 'vegatable',
      id: 2,
      attributes: {
        name: 'carrot'
      }
    }
  ]
};




export default Route.extend({
  server: undefined as any,
  requests: [] as any[],
  currentModel: undefined as any,
  model() {
    let fruitArr: any = [];
    let vegatableArr: any = [];
    this.store.pushPayload('fruit', !this.store.peekAll ? LEGACY_FRUIT_PAYLOAD : FRUIT_PAYLOAD);
    this.store.pushPayload('vegatable', !this.store.peekAll ? LEGACY_VEGATABLE_PAYLOAD : VEGATABLE_PAYLOAD);
    if (!this.store.peekAll) {
      fruitArr = [1, 2, 3, 4].map(id => (this.store as any).getById('fruit', id));
      vegatableArr = [1, 2].map(id => (this.store as any).getById('vegatable', id));
    } else {
      fruitArr = this.store.peekAll('fruit');
      vegatableArr = this.store.peekAll('vegatable');
    }

    return { fruit: A(fruitArr), vegatable: A(vegatableArr) };
  },

  beforeModel() {
    this._super(...arguments);
    if (!testing) {
      this._setupPretender();
    }
  },

  deactivate() {
    this._super(...arguments);
  },

  willDestroy() {
    this._super(...arguments);
    if (!this.get('currentModel').constructor) {
      this.get('currentModel').constructor = {};
    }
  },

  _setupPretender() {
    const server = new Pretender();
    // server.get('/fruits', request => {
    //   return [200, {}, JSON.stringify({
    //     fruits:
    //   })];
    // });
    server.put('/fruits/:id/doRipen', (request: any) => {
      const controller: any = this.get('controller');
      controller.get('requests').addObject({
        url: request.url,
        data: JSON.parse(request.requestBody)
      });
      return [200, {}, '{"status": "ok"}'];
    });
    server.put('/fruits/ripenEverything', (request: any) => {
      const controller: any = this.get('controller');
      controller.get('requests').addObject({
        url: request.url,
        data: JSON.parse(request.requestBody)
      });
      return [200, {}, '{"status": "ok"}'];
    });
    server.get('/fruits/:id/info', (request: any) => {
      const controller: any = this.get('controller');
      controller.get('requests').addObject({
        url: request.url
      });
      return [200, {}, '{"status": "ok"}'];
    });

    server.get('/fruits/fresh', (request: any) => {
      const controller: any = this.get('controller');
      controller.get('requests').addObject({
        url: request.url
      });
      return [200, {}, '{"status": "ok"}'];
    });
    this.set('server', server);
  },

  _teardownPretender() {
    this.get('server').shutdown();
  }
});
