import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import icon_add from '../../Images/addTask.png';
import icon_search from '../../Images/searchTask.png';
const ListButton = ({gotoPage}) => {
  return (
    <View style={styles.listButton}>
      <TouchableOpacity style={styles.btn} onPress={() => gotoPage('/addTask')}>
        <Image source={icon_add} style={styles.icon_add} />
        <Text style={styles.btn_text}>ADD TASK</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => gotoPage('/searchTask')}>
        <Image source={icon_search} style={styles.icon_search} />
        <Text style={styles.btn_text}>SEARCH</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ListButton;

const styles = StyleSheet.create({
  listButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    textAlign: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    height: 45,
    borderRadius: 4,
    backgroundColor: '#40d0a2',
  },
  btn_text: {
    fontSize: 16,
    color: '#fff',
  },
  icon_add: {
    width: 22,
    height: 17,
    marginRight: 8,
  },
  icon_search: {
    width: 22,
    height: 22,
    marginRight: 5,
  },
});
