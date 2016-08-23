module.exports = {
  scenarios: [{
    name: 'default',
    bower: {
      dependencies: {}
    }
  }, {
    name: 'ember-1.11',
    npm: {
      'ember-data': '~1.13.0'
    },
    bower: {
      dependencies: {
        'ember': '~1.11.0',
        'ember-data': '~1.13.0',
        'ember-cli-shims': '~0.0.6'
      },
      resolutions: {
        'ember': '~1.11.0'
      }
    }
  }, {
    name: 'ember-1.12',
    npm: {
      'ember-data': '~1.13.0'
    },
    bower: {
      dependencies: {
        'ember': '~1.12.0',
        'ember-data': '~1.13.0',
        'ember-cli-shims': '~0.0.6'
      },
      resolutions: {
        'ember': '~1.12.0'
      }
    }
  }, {
    name: 'ember-1.13',
    bower: {
      dependencies: {
        'ember': '~1.13.0',
        'ember-data': '~1.13.0',
        'ember-cli-shims': '~0.0.6'
      },
      resolutions: {
        'ember': '~1.13.0',
        'ember-data': '~1.13.0'
      }
    }
  }, {
    name: 'ember-2.0',
    bower: {
      dependencies: {
        'ember': '~2.0.0',
        'ember-data': '~2.0.0',
        'ember-cli-shims': '~0.0.6'
      },
      resolutions: {
        'ember': '~2.0.0',
        'ember-data': '~2.0.0'
      }
    }
  }, {
    name: 'ember-2.1',
    bower: {
      dependencies: {
        'ember': '~2.1.0',
        'ember-data': '~2.1.0',
        'ember-cli-shims': '~0.0.6'
      },
      resolutions: {
        'ember': '~2.1.0',
        'ember-data': '~2.1.0'
      }
    }
  }, {
    name: 'ember-2.4',
    bower: {
      dependencies: {
        'ember': '~2.4.0',
        'ember-data': '~2.4.0'
      },
      resolutions: {
        'ember': '~2.4.0',
        'ember-data': '~2.4.0'
      }
    }
  }, {
    name: 'ember-2.7',
    bower: {
      dependencies: {
        'ember': '~2.7.0',
        'ember-data': '~2.7.0'
      },
      resolutions: {
        'ember': '~2.7.0',
        'ember-data': '~2.7.0'
      }
    }
  }, {
    name: 'ember-release',
    bower: {
      dependencies: {
        'ember': 'components/ember#release',
        'ember-data': '~2.7.0'
      },
      resolutions: {
        'ember': 'components/ember#release',
        'ember-data': '~2.7.0'
      }
    }
  }, {
    name: 'ember-beta',
    bower: {
      dependencies: {
        'ember': 'components/ember#beta',
        'ember-data': '~2.7.0'
      },
      resolutions: {
        'ember': 'components/ember#beta',
        'ember-data': '~2.7.0'
      }
    }
  }, {
    name: 'ember-canary',
    bower: {
      dependencies: {
        'ember': 'components/ember#canary',
        'ember-data': '~2.7.0'
      },
      resolutions: {
        'ember': 'components/ember#canary',
        'ember-data': '~2.7.0'
      }
    }
  }]
};
