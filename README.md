# Ember-api-actions

[![Build Status](https://travis-ci.org/truenorth/ember-api-actions.svg?branch=master)](https://travis-ci.org/truenorth/ember-api-actions)
[![Dependency Status](https://david-dm.org/truenorth/ember-api-actions.svg)](https://david-dm.org/truenorth/ember-api-actions)
[![devDependency Status](https://david-dm.org/truenorth/ember-api-actions/dev-status.svg)](https://david-dm.org/truenorth/ember-api-actions#info=devDependencies)

Trigger "remote" actions on ember-data resources that don't fit into typical CRUD RESTful API design.

For example, if you have restful API endpoints like

```
GET     /fruits
POST    /fruits
GET     /fruits/123
PUT     /fruits/123
DELETE  /fruits/123
```

What happens if you want an intuitive API endpoint like this:

```
PUT    /fruits/123/ripen
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
import { instanceOp, classOp } from 'ember-api-actions';

const { attr } = DS;

export default DS.Model.extend({
  name: attr('string'),

  // /fruits/123/doRipen
  ripen: instanceOp({ path: 'doRipen' }),

  // /fruits/ripenEverything
  ripenAll: classOp({ path: 'ripenEverything' })
});

```

you can then call these functions, and they will initiate API requests and return you the promise

```js

// Pass data in, it will be sent in the POST or PUT request payload
myRecord.ripen({
  someData: 'abc'
}).then(response => {
  // do something when the API returns a response
});

```

## Customization

ember-api-actions generates URLs and ajax configuration via ember-data adapters. It will identify the appropriate adapter, and call the `buildURL` and `ajaxOptions` methods to send a JSON request similar to way conventional ember-data usage works. 

Customizing your adapter should customize requests sent out via this library, along with any other ember-data requests.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
