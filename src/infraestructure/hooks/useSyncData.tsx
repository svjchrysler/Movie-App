import {useState, useEffect} from 'react';
import omdbApi from '../../data/api/OMDB-Api';
import CONSTANTS from '../constants';
import Movie from '../../data/models/Movie';
import MovieRepository from '../../data/repositories/MovieRepository';
import NetInfo from '@react-native-community/netinfo';

interface Props {
  retry: any;
}

const useSyncData = (retry: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>();
  const [type, setType] = useState<string>();

  useEffect(() => {
    startSync();
  }, []);

  useEffect(() => {
    startSync();
  }, [retry]);

  const startSync = async () => {
    setIsVisible(true);
    const isConnected = await verifyConectionToInternet();
    if (isConnected) {
      initSync();
    } else {
      setIsVisible(false);
      setMessage('Se necesita estar conectado a internet');
      setType('INTERNET_ERROR');
    }
  };

  const verifyConectionToInternet = () => {
    return NetInfo.fetch().then(networkState => {
      return networkState.isConnected;
    });
  };

  const initSync = async () => {
    try {
      const urlParams = `?apikey=${CONSTANTS.API_KEY}&y=${CONSTANTS.YEAR}&s=${CONSTANTS.TITLE}`;
      const response = await omdbApi.get(`${urlParams}&page=1`);
      if (response.data.Response) {
        const lastPage = Math.ceil(response.data.totalResults / 10);
        const promises: Array<any> = [];

        for (let i = 2; i <= lastPage; i++) {
          promises.push(omdbApi.get(`${urlParams}&page=${i}`));
        }

        let result = await Promise.all(promises);
        result = result.map((res: any) => res.data.Search);
        let resultMovie: Array<any> = [];
        result.forEach((movie: any) => {
          resultMovie = resultMovie.concat(movie);
        });
        resultMovie = resultMovie.concat(response.data.Search);
        let movieList: Array<Movie> = [];
        for (const item of resultMovie) {
          movieList.push({
            title: item.Title,
            imdbID: item.imdbID,
            poster: item.Poster,
            type: item.Type,
            year: item.Year,
          });
        }
        await saveData(movieList);
        setMessage('Sincronizacion exitosa');
        setIsVisible(false);
        setType('SYNC_DONE');
      } else {
        throw new Error('Error al realizar la peticion');
      }
    } catch (error: any) {
      setIsVisible(false);
      setMessage(error.message);
      setType('FETCH_ERROR');
    }
  };

  const saveData = async (movies: Array<any>) => {
    await MovieRepository.saveMovies(movies);
  };

  return [isVisible, message, type];
};

export default useSyncData;
