import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeRouter, Switch, Route} from 'react-router-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setLoginAction, setLogout} from '../Redux/Actions/AuthActions';
import {decode} from '../utils/helpers';
import PrivateRoute from './PrivateRoute';
import Login from '../Screens/Login/Index';
import Register from '../Screens/Register/Index';
import Home from '../Screens/Home/Index';
import AddTask from '../Screens/AddTask';
import SearchTask from '../Screens/SearchTask';

const RouterNative = () => {
  const dispatch = useDispatch();
  const retrieveData = async () => {
    try {
      const currentTime = Date.now() / 1000;
      const value = await AsyncStorage.getItem('@access_token');
      const data = await decode(value);
      if (data.exp < currentTime || !data) {
        await AsyncStorage.removeItem('@access_token');
        dispatch(setLogout());
      } else {
        dispatch(setLoginAction(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    retrieveData();
  }, []);
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Switch>
          <PrivateRoute
            exact
            path="/"
            component={Home}
            isBack={false}
            nameScreen="Task management"
          />
          <PrivateRoute
            path="/addTask"
            component={AddTask}
            nameScreen="Add task"
          />
          <PrivateRoute
            path="/searchTask"
            component={SearchTask}
            nameScreen="Search task"
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </View>
    </NativeRouter>
  );
};

export default RouterNative;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
