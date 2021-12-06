import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Dimensions, View, StyleSheet, Alert, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getRequest} from '../../utils/api-request';
import {pathTasks} from '../../utils/api-path';
import ListButton from './ListButton';
import Item from './Item';
import {setLogout} from '../../Redux/Actions/AuthActions';
const fWidth = Dimensions.get('window').width;
const Home = props => {
  // console.log(props);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.access_token);
  const [tasks, setTasks] = useState([]);
  const getTasks = async () => {
    const path = pathTasks;
    try {
      await getRequest(path, token).then(async res => {
        if (res.status === 200) {
          setTasks(res.result);
        } else if (res.status === 401) {
          await AsyncStorage.removeItem('@access_token');
          dispatch(setLogout());
          props.history.push('/login');
        } else {
          Alert.alert(res.result.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const gotoPage = page => {
    props.history.push(page);
  };

  useEffect(() => {
    getTasks();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <ListButton gotoPage={gotoPage} />
        <View style={styles.wrapList}>
          {tasks.length > 0 ? (
            tasks.map((item, idx) => (
              <Item key={idx} task={item} getTasks={getTasks} />
            ))
          ) : (
            <Text style={styles.textEmpty}>No data</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Home;

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
  wrapSearch: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 40,
  },
  input: {
    width: 0.68 * fWidth,
    marginRight: 10,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 18,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 45,
    borderRadius: 2,
    backgroundColor: '#40d0a2',
  },
  btn_text: {
    fontSize: 17,
    color: '#fff',
  },
  wrapList: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 50,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopColor: '#ddd',
  },
  textEmpty: {
    marginTop: 15,
    fontSize: 18,
    textAlign: 'center',
  },
});
