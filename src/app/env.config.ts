import { environment } from '../environments/environment';


// const DEV_ENV_CONFIG = {
const DEV_ENV_CONFIG = {
  'API_URLS': {
    'DATA_CONNECTION': 'http://ec2-34-228-33-0.compute-1.amazonaws.com/DataConnector/index.php/DataConnectAPI',
    'LOGIN_URL': 'http://ec2-34-228-33-0.compute-1.amazonaws.com/DataConnector/index.php/DataConnectAPI/login'
  },


};

const PROD_ENV_CONFIG = {
  'API_URLS': {
    'DATA_CONNECTION': 'http://ec2-34-228-33-0.compute-1.amazonaws.com/DataConnector/index.php/DataConnectAPI',
    'LOGIN_URL': 'http://ec2-34-228-33-0.compute-1.amazonaws.com/DataConnector/index.php/DataConnectAPI/login'
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
