module.exports = {
  scenarios: [{
    name: 'default',
    bower: {
      dependencies: {}
    }
  }, {
    name: 'ember-1.11-ember-data-beta.16',
    npm: {
      dependencies: {
        'ember-data': '1.0.0-beta.16.1'
      }
    },
    bower: {
      dependencies: {
        'ember': '~1.11.0',
        'ember-data': '1.0.0-beta.16.1',
        'ember-cli-shims': '~0.0.6'
      },
      resolutions: {
        'ember': '~1.11.0',
        'ember-data': '1.0.0-beta.16.1'
      }
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
    name: 'ember-2.2',
    bower: {
      dependencies: {
        'ember': 'components/ember#release',
        'ember-data': '~2.2.0',
        'ember-cli-shims': '~0.0.6'
      },
      resolutions: {
        'ember': 'release',
        'ember-data': '~2.2.0'
      }
    }
  }, {
    name: 'ember-release',
    bower: {
      dependencies: {
        'ember': 'components/ember#release',
        'ember-data': '~2.3.0'
      },
      resolutions: {
        'ember': 'release'
      }
    }
  }, {
    name: 'ember-beta',
    bower: {
      dependencies: {
        'ember': 'components/ember#beta',
        'ember-data': '~2.3.0'
      },
      resolutions: {
        'ember': 'beta'
      }
    }
  }]
};
