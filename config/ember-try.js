module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'ember-1.11-ember-data-beta.16',
      dependencies: {
        'ember': '~1.11.0',
        'ember-data': '1.0.0-beta.16.1'
      },
      resolutions: {
        'ember': '~1.11.0',
        'ember-data': '1.0.0-beta.16.1'
      }
    },
    {
      name: 'ember-1.11',
      dependencies: {
        'ember': '~1.11.0'
      },
      resolutions: {
        'ember': '~1.11.0'
      }
    },
    {
      name: 'ember-1.12',
      dependencies: {
        'ember': '~1.12.0'
      },
      resolutions: {
        'ember': '~1.12.0'
      }
    },
    {
      name: 'ember-1.13',
      dependencies: {
        'ember': '~1.13.0',
        'ember-data': '~1.13.0'
      },
      resolutions: {
        'ember': '~1.13.0',
        'ember-data': '~1.13.0'
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'components/ember#release',
        'ember-data': '~2.0.0'
      },
      resolutions: {
        'ember': 'release',
        'ember-data': '~2.0.0'
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        'ember': 'components/ember#beta',
        'ember-data': '~2.0.0'
      },
      resolutions: {
        'ember': 'beta',
        'ember-data': '~2.0.0'
      }
    },
    {
      name: 'ember-canary',
      dependencies: {
        'ember': 'components/ember#canary',
        'ember-data': '~2.0.0'
      },
      resolutions: {
        'ember': 'canary',
        'ember-data': '~2.0.0'
      }
    }
  ]
};
