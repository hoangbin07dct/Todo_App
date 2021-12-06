import React from 'react';
import {View, StyleSheet, Alert, Text, Dimensions} from 'react-native';
const fWidth = Dimensions.get('window').width;
const AddTask = () => {
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <Text>Add Task</Text>
      </View>
    </View>
  );
};
export default AddTask;

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
