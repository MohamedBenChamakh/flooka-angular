export const environment = {
    production: false,
    serverUrl: '/api',
    keycloak: {
      issuer: 'http://localhost:8082/',
      realm: 'app',
      clientId: 'frontend-client',
    },
  };