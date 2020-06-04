import { environment } from '../environments/environment';


// const DEV_ENV_CONFIG = {
const DEV_ENV_CONFIG = {
  'API_URLS': {
    'DATA_CONNECTION': 'http://localhost/api-dataconnector/V1/dataconnectorApi',
    'LOGIN_URL': 'http://ec2-34-228-33-0.compute-1.amazonaws.com/DataConnector/index.php/DataConnectAPI/login',
    'AUTH_TOKEN': 'https://ap17.salesforce.com/services/apexrest/Objects/',
    'Access_Token_URL': 'https://login.salesforce.com/services/oauth2/token',
    'Client_ID': '3MVG97quAmFZJfVxZqX4k4PS4LKRvEfvx6rZeZC0KgtNFjTbrAOmvlhkPJW0GVsywfa_xbtjiQ8tBMQnpPzRh',
    'Consumer_Secret': '98BED80A03CA62B733B5A79B7CA89EEA2B87BCD41E6518DE222BBA80B6983DE3',
    'Username': 'ramakrishna.prasad@dataconnector.com',
    'Password': 'R@mki123'

  },


};

const PROD_ENV_CONFIG = {
  'API_URLS': {
    'DATA_CONNECTION': 'http://localhost/api-dataconnector/V1/dataconnectorApi',
    'LOGIN_URL': 'http://ec2-34-228-33-0.compute-1.amazonaws.com/DataConnector/index.php/DataConnectAPI/login',
    'AUTH_TOKEN': 'https://ap17.salesforce.com/services/apexrest/Objects/',
    'Access_Token_URL': 'https://login.salesforce.com/services/oauth2/token',
    'Client_ID': '3MVG97quAmFZJfVxZqX4k4PS4LKRvEfvx6rZeZC0KgtNFjTbrAOmvlhkPJW0GVsywfa_xbtjiQ8tBMQnpPzRh',
    'Consumer_Secret': '98BED80A03CA62B733B5A79B7CA89EEA2B87BCD41E6518DE222BBA80B6983DE3',
    'Username': 'ramakrishna.prasad@dataconnector.com',
    'Password': 'R@mki123'

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
