module.exports = {
  scenarios: [
    {
      name: 'default',
      dependencies: { }
    },
    {
      name: 'ember-1.10',
      dependencies: {
        'ember': '~1.10.0'
      },
      resolutions: {
        'ember': '~1.10.0'
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
      name: 'ember-release',
      dependencies: {
        'ember': 'components/ember#release'
      },
      resolutions: {
        'ember': 'release'
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'components/ember#release'
      },
      resolutions: {
        'ember': 'release'
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        'ember': 'components/ember#beta',
        'ember-data': 'components/ember-data#canary'
      },
      resolutions: {
        'ember': 'beta',
        'ember-data': 'canary'
      }
    },
    {
      name: 'ember-canary',
      dependencies: {
        'ember': 'components/ember#canary',
        'ember-data': 'components/ember-data#canary'
      },
      resolutions: {
        'ember': 'canary',
        'ember-data': 'canary'
      }
    }
  ]
};
