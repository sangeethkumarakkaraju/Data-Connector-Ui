import { environment } from '../environments/environment';


// const DEV_ENV_CONFIG = {
const DEV_ENV_CONFIG = {
  'API_URLS': {
    'DATA_CONNECTION': 'http://localhost/api-dataconnector/V1/dataconnectorApi/',
  },


};

const PROD_ENV_CONFIG = {
  'API_URLS': {
    'DATA_CONNECTION': '/api-dataconnector/V1/dataconnectorApi/',
  }
};


export const ENV_CONFIG = getEnvValues();

function getEnvValues() {
  if (environment.envName === 'prod') {
    return PROD_ENV_CONFIG;
  }
  if (environment.envName === 'dev') {
    return DEV_ENV_CONFIG;
  }
}
