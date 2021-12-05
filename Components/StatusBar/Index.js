import React from 'react';
import {View, StatusBar, Platform} from 'react-native';

const StatusBarCustom = () => {
  Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
  return (
    <View>
      <StatusBar backgroundColor="#40d0a2" barStyle="light-content" />
    </View>
  );
};

export default StatusBarCustom;
