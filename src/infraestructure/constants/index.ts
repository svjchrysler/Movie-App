import DEV from './env.dev';
import selectedEnvironment from '../../../config-environment-files/environment-mode';

const getEnvironmentValues = (env: string) => {
  if (env === 'DEV') {
    return DEV;
  }
  return DEV;
};

const CONSTANTS = getEnvironmentValues(selectedEnvironment);

export default CONSTANTS;
