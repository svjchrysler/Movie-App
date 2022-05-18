export const MovieSchema = {
  name: 'Movie',
  properties: {
    title: 'string',
    year: 'string',
    imdbID: 'string',
    type: 'string',
    poster: 'string',
  },
  primaryKey: 'imdbID',
};
