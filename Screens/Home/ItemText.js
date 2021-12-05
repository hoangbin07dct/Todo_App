import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const ItemText = ({label, value}) => {
  return (
    <View style={styles.itemRow}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default ItemText;

const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
  },
  value: {
    fontSize: 16,
    marginLeft: 10,
  },
});
