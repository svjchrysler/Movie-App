import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Provider as PaperProvider, Colors, Banner} from 'react-native-paper';

import Movies from './src/presentation/screens/Movies';
import Loading from './src/presentation/components/Loading';
import useSyncData from './src/infraestructure/hooks/useSyncData';

const App = () => {
  const [actions, setActions] = useState([]);
  const [isVisibleBanner, setIsVisibleBanner] = useState(false);
  const [retry, setRetry] = useState<any>();
  const [isVisible, message, type] = useSyncData(retry);

  useEffect(() => {
    generateAction();
  }, [type]);

  const retrySync = () => {
    setRetry(Math.random());
  };

  const closeBanner = () => {
    setIsVisibleBanner(false);
  };

  const TYPES = {
    FETCH_ERROR: [
      {
        label: 'Reintentar',
        onPress: retrySync,
      },
    ],
    SYNC_DONE: [
      {
        label: 'Aceptar',
        onPress: closeBanner,
      },
    ],
    INTERNET_ERROR: [
      {
        label: 'Reintentar',
        onPress: retrySync,
      },
    ],
  };

  const generateAction = () => {
    setIsVisibleBanner(true);
    const act = TYPES[type];
    if (act) {
      setActions(act);
    }
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.background}>
        <Banner
          visible={isVisibleBanner}
          actions={actions}
          style={styles.backgroundBanner}>
          {message}
        </Banner>
        <Movies isLoading={isVisible} />
        <Loading isVisible={isVisible} />
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  backgroundBanner: {
    backgroundColor: Colors.green300,
    color: Colors.white,
  },
});

export default App;
