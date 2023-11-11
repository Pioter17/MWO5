export const environment = {
  production: true,
  apiUrl: 'https://api.prod.com',
  configurationName: 'Production Configuration',
  budgets: [
    {
      type: 'initial',
      maximumWarning: '500kb',
      maximumError: '1mb',
    },
    {
      type: 'anyComponentStyle',
      maximumWarning: '2kb',
      maximumError: '4kb',
    },
  ],
  outputHashing: 'all',
};
