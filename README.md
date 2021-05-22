# ember-api-actions

[![Build Status](https://travis-ci.org/mike-north/ember-api-actions.svg?branch=master)](https://travis-ci.org/mike-north/ember-api-actions)
[![npm version](https://badge.fury.io/js/ember-api-actions.svg)](http://badge.fury.io/js/ember-api-actions)
[![Code Climate](https://codeclimate.com/github/mike-north/ember-api-actions/badges/gpa.svg)](https://codeclimate.com/github/mike-north/ember-api-actions)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Trigger "remote" actions on ember-data resources that don't fit into typical CRUD RESTful API design.

For example, if you have restful API endpoints like

```
GET     /fruits
POST    /fruits
GET     /fruits/123
PUT     /fruits/123
DELETE  /fruits/123
```

What happens if you want to consume API endpoints like these:

```
PUT    /fruits/123/ripen
GET    /fruits/citrus
```

Example Rails API routes:

**config/routes.rb**

```rb
Rails.application.routes.draw do

  resources :fruits do
    member do
      put 'ripen' to: 'fruits#ripen'
    end
    collection do
      get 'citrus' to: 'fruits#citrus_index'
    end
  end

end
```

This is not immediately intuitive with ember-data, and these kinds of API endpoints can be found [in widely-used RESTful APIs](https://developer.github.com/v3/gists/#star-a-gist). This library aims to make it easy.

## Use

```sh
# ember-cli >= 0.2.3
ember install ember-api-actions

# ember-cli < 0.2.3
ember install:addon ember-api-actions
```

You can then add these "actions" (not to be confused with client-side ember.js actions) to your ember-data model

**app/models/fruit.js**

```js
import DS from 'ember-data';
import { memberAction, collectionAction } from 'ember-api-actions';

const { attr } = DS;

export default DS.Model.extend({
  name: attr('string'),
  // /fruits/123/ripen
  ripen: memberAction({ path: 'ripen' }),
  // /fruits/citrus
  getAllCitrus: collectionAction({
    path: 'citrus',
    type: 'post', // HTTP POST request
    urlType: 'findRecord' // Base of the URL that's generated for the action
  })
});
```

you can then call these functions, and they will initiate API requests and return you the promise

```js
// Pass data in, it will be sent in the POST or PUT request payload
myRecord.ripen({ someData: 'abc' }).then(response => {
  // do something when the API returns a response
});
```

### Before and After Hooks

Use `before` and `after` hooks to customize the request and response. The hooks are available for both member actions and collection actions.

**Before**

Say you'd like to use ember-data to serialize your model, passing in only some, additional specific changes. You can do that like so:


```js
eat: memberAction({
  path: 'eat',
  before(attributes) {
    let payload = this.serialize();
    payload.data.attributes = assign(payload.data.attributes, attributes);
    return payload;
  }
})

// Call it like this:
model.eat({ is_eaten: true });

// JSON API request payload would look something like:
{ data: { id: '1', type: 'fruit', attributes: { name: 'apple', is_eaten: true } } }
```

**After**

The after hook receives the response payload as an argument.

```js
eat: memberAction({
 path: 'eat',
 after(response) {
   console.log(`Received response for model ${response.data.id}`);
 }
});
```

**SerializeAndPush**

You can use the `after` hook to push into the store. We've included a helper called [`serializeAndPush`](https://github.com/mike-north/ember-api-actions/blob/master/addon/utils/serialize-and-push.ts) to do this.

```js
import DS from 'ember-data';
import { memberAction, serializeAndPush } from 'ember-api-actions';

export default DS.Model.extend({
 eat: memberAction({
   path: 'eat',
   after: serializeAndPush
});
```

*Warning* this implemention only works for JSON API, but it should be easy to write your own `after` hook to handle your use case. Have a look at the [implementation of `serializeAndPush`](https://github.com/mike-north/ember-api-actions/blob/master/addon/utils/serialize-and-push.ts) for an example.

## Customization

ember-api-actions generates URLs and ajax configuration via ember-data adapters. It will identify the appropriate adapter, and call the `buildURL` and `ajaxOptions` methods to send a JSON request similar to way conventional ember-data usage works.

Customizing your adapter should customize requests sent out via this library, along with any other ember-data requests.

**ember-api-actions uses the following methods on DS.Adapter**

- [buildURL](http://emberjs.com/api/data/classes/DS.RESTAdapter.html#method_buildURL) - for generating an action's URL
- [ajax](https://github.com/emberjs/data/blob/v1.13.4/packages/ember-data/lib/adapters/rest-adapter.js#L836-L859) (private) - to actually make the API request and return a promise

## Installation

- `git clone` this repository
- `npm install`
- `bower install`

## Running

- `ember serve`
- Visit your app at http://localhost:4200.

## Running Tests

- `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
- `ember test`
- `ember test --server`

Make sure to set `ALLOW_DEPRECATIONS=true` or the tests will raise
errors on deprecation

## Building

- `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

![Analytics](https://ga-beacon.appspot.com/UA-66610985-1/mike-north/ember-api-actions/readme)
