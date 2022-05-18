import React from 'react';

import {View} from 'react-native';
import {Modal, Text} from 'react-native-paper';

interface Props {
  isVisible: boolean;
}

const Loading = ({isVisible}: Props) => {
  return (
    <Modal visible={isVisible} contentContainerStyle={containerStyle}>
      <Text>Sincronizando Información...</Text>
    </Modal>
  );
};

const containerStyle = {backgroundColor: 'white', padding: 20};

export default Loading;
