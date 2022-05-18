import axios from 'axios';
import CONSTANTS from '../../infraestructure/constants';

const omdbApi = axios.create({
  baseURL: `${CONSTANTS.API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default omdbApi;
