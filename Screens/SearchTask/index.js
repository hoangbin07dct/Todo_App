import React from 'react';
import {View, StyleSheet, Alert, Text, Dimensions} from 'react-native';
const fWidth = Dimensions.get('window').width;
const SearchTask = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text>Search Task</Text>
      </View>
    </View>
  );
};
export default SearchTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: fWidth,
  },
  contents: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 50,
    paddingHorizontal: 20,
  },
});
