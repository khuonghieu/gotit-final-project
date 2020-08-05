import localConfigs from './local';
import devConfigs from './dev';
import prodConfigs from './prod';

let configs = localConfigs;

if (process.env.REACT_APP_ENV === 'prod') {
  configs = prodConfigs;
} else if (process.env.REACT_APP_ENV === 'dev') {
  configs = devConfigs;
}

export default ({ ...configs });
