import React from "react";
import { View, StatusBar, Platform, Text } from "react-native";

const StastusBarCustom = () => {
  console.log(StatusBar);
  const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
  return (
    <View style={{height: STATUS_BAR_HEIGHT}}>
      <StatusBar backgroundColor="#40d0a2" barStyle="light-content" />
      <Text>Test status bar screen</Text>
    </View>
  )
}

export default StastusBarCustom;