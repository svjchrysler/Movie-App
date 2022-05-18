import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Text, Card, Colors} from 'react-native-paper';

import MovieRepository from '../../data/repositories/MovieRepository';

interface Props {
  isLoading: boolean;
}

const Movies = ({isLoading}: Props) => {
  const [movies, setMovies] = useState<any>([]);

  useEffect(() => {
    getMovies();
  }, [isLoading]);

  const getMovies = async () => {
    const resultMovies = await MovieRepository.getMovies();
    setMovies(resultMovies);
  };

  const movieItem = ({item}: any) => {
    return (
      <Card>
        <Card.Cover source={{uri: item.poster}} />
        <Card.Title title={item.title} />
        <View style={styles.containerItem}>
          <Text style={[styles.containerItem, styles.backgroundType]}>
            {item.type}
          </Text>
          <Text style={[styles.containerItem, styles.backgroundYear]}>
            {item.year}
          </Text>
        </View>
      </Card>
    );
  };

  const itemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View>
      <Text style={styles.title}>Movies</Text>
      {movies.length > 0 ? (
        <FlatList
          data={movies}
          renderItem={movieItem}
          keyExtractor={item => item.imdbID}
          ItemSeparatorComponent={itemSeparator}
        />
      ) : (
        <Text style={styles.textEmpty}>No hay Datos</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    padding: 5,
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
    justifyContent: 'center',
  },
  backgroundType: {
    backgroundColor: Colors.yellow600,
  },
  backgroundYear: {
    backgroundColor: Colors.blue400,
  },
  separator: {
    marginTop: 5,
  },
  title: {
    color: Colors.teal600,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
    margin: 10,
  },
  textEmpty: {
    textAlign: 'center',
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Movies;
