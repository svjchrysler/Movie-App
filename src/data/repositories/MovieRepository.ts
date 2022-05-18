import Setting from '../data-source/setting';
import Movie from '../models/Movie';

const SCHEMA_NAME = 'Movie';

const getMovies = async () => {
  const realm = await Setting.openConection();
  return realm.objects(SCHEMA_NAME);
};

const saveMovies = async (movies: Array<Movie>) => {
  try {
    const realm = await Setting.openConection();
    realm.beginTransaction();
    const savedMovies = realm.objects(SCHEMA_NAME);
    const difference = movies.filter((movie: any) => {
      return !savedMovies.some((savedMovie: any) => {
        return movie.imdbID === savedMovie.imdbID;
      });
    });

    const movieList = removeDuplicates(difference);

    const promises: Array<any> = [];
    movieList.forEach((movie: any) => {
      promises.push(realm.create(SCHEMA_NAME, movie));
    });

    await Promise.all(promises);
    realm.commitTransaction();
  } catch (e) {
    console.log('realm error', e);
  }
};

const removeDuplicates = (movies: Array<Movie>) => {
  const uniqueValuesSet = new Set();
  const filteredArr = movies.filter(movie => {
    const isPresentInSet = uniqueValuesSet.has(movie.imdbID);
    uniqueValuesSet.add(movie.imdbID);
    return !isPresentInSet;
  });
  return filteredArr;
};

export default {saveMovies, getMovies};
