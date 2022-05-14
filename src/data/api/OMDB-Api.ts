import axios from 'axios';
import CONSTANTS from '../../infraestructure/constants';

const omdbApi = axios.create({
  baseURL: `${CONSTANTS.API_KEY}/?apikey=${CONSTANTS.API_KEY}&s=${CONSTANTS.TITLE}&y=${CONSTANTS.YEAR}`,
});

export default omdbApi;
