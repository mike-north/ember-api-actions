import Ember from 'ember';

const { assert } = Ember;

function transformObject(object, operation) {
  if (object instanceof Object) {
    let data = {};

    Object.keys(object).forEach((key) => {
      data[key[operation]()] = transformObject(object[key], operation);
    });

    return data;
  } else {
    return object;
  }
}

export default function(payload, operation) {
  if (operation) {
    assert("This normalize method of custom action's payload does not exist. Check Ember.String documentation!", !!Ember.String[operation]); // jscs:ignore disallowDirectPropertyAccess
    return transformObject(payload, operation);
  } else {
    return payload;
  }
}
