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
      name: 'ember-2.0',
      dependencies: {
        'ember': '~2.0.0',
        'ember-data': '~2.0.0'
      },
      resolutions: {
        'ember': '~2.0.0',
        'ember-data': '~2.0.0'
      }
    },
    {
      name: 'ember-2.1',
      dependencies: {
        'ember': '~2.1.0',
        'ember-data': '~2.1.0'
      },
      resolutions: {
        'ember': '~2.1.0',
        'ember-data': '~2.1.0'
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        'ember': 'components/ember#release',
        'ember-data': '~2.2.0'
      },
      resolutions: {
        'ember': 'release',
        'ember-data': '~2.2.0'
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        'ember': 'components/ember#beta',
        'ember-data': 'beta'
      },
      resolutions: {
        'ember': 'beta',
        'ember-data': 'beta'
      }
    },
    {
      name: 'ember-canary',
      dependencies: {
        'ember': 'components/ember#canary',
        'ember-data': 'canary'
      },
      resolutions: {
        'ember': 'canary',
        'ember-data': 'canary'
      }
    }
  ]
};
