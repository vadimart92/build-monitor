export const SampleProfile = {
  'screens': [
    {
      'type': 'buildStatus',
      'displayTime': 60,
      'builds': [
        {
          'buildServer': 'testServer',
          'config': {
            'buildIds': [
              'BuildMonitor_TestSuccess',
              'BuildMonitor_TestRunning',
              'BuildMonitor_TestFail'
            ]
          }
        }
      ]
    }
  ]
};
