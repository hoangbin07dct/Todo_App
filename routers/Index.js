import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeRouter, Switch, Route} from 'react-router-native';
import Login from '../Screens/Login/Index';
import Home from '../Screens/Home/Index';
import PrivateRoute from './PrivateRoute';
import Register from '../Screens/Register/Index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setLoginAction, setLogout} from '../Redux/Actions/AuthActions';
import {decode} from '../utils/helpers';

const RouterNative = () => {
  const dispatch = useDispatch();
  const retrieveData = async () => {
    try {
      const currentTime = Date.now() / 1000;
      const value = await AsyncStorage.getItem('@access_token');
      const data = await decode(value);
      if (data.exp < currentTime || !data) {
        console.log('fffff');
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
