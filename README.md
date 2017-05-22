# ember-api-actions

[![Greenkeeper badge](https://badges.greenkeeper.io/mike-north/ember-api-actions.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/mike-north/ember-api-actions.svg?branch=master)](https://travis-ci.org/mike-north/ember-api-actions)
[![Dependency Status](https://david-dm.org/mike-north/ember-api-actions.svg)](https://david-dm.org/mike-north/ember-api-actions)
[![devDependency Status](https://david-dm.org/mike-north/ember-api-actions/dev-status.svg)](https://david-dm.org/mike-north/ember-api-actions#info=devDependencies)
[![Ember Observer Score](http://emberobserver.com/badges/ember-api-actions.svg)](http://emberobserver.com/addons/ember-api-actions)
[![npm version](https://badge.fury.io/js/ember-api-actions.svg)](http://badge.fury.io/js/ember-api-actions)
[![Code Climate](https://codeclimate.com/github/mike-north/ember-api-actions/badges/gpa.svg)](https://codeclimate.com/github/mike-north/ember-api-actions)

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
myRecord.ripen({someData: 'abc'}).then(response => {
  // do something when the API returns a response
});
```

## Customization

ember-api-actions generates URLs and ajax configuration via ember-data adapters. It will identify the appropriate adapter, and call the `buildURL` and `ajaxOptions` methods to send a JSON request similar to way conventional ember-data usage works. 

Customizing your adapter should customize requests sent out via this library, along with any other ember-data requests. 

**ember-api-actions uses the following methods on DS.Adapter**

* [buildURL](http://emberjs.com/api/data/classes/DS.RESTAdapter.html#method_buildURL) - for generating an action's URL
* [ajax](https://github.com/emberjs/data/blob/v1.13.4/packages/ember-data/lib/adapters/rest-adapter.js#L836-L859) (private) - to actually make the API request and return a promise

## Compatibility

This addon is known to work with certain combinations of ember.js and ember-data

Ember.js | Ember-data
---------|-------------
`1.10 <= ember < 1.13` | `1.0.0-beta.16.0 <= ember-data <= 1.0.0-beta.19`
`1.13.x` | `1.13.x`
`2.0.x` | `2.0.x`

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

Make sure to set `ALLOW_DEPRECATIONS=true` or the tests will raise
errors on deprecation

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).

![Analytics](https://ga-beacon.appspot.com/UA-66610985-1/mike-north/ember-api-actions/readme)
