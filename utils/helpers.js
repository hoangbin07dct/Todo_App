import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

const defaultObj = {
  isLogin: false,
  account: null,
  email: null,
  fullname: null,
  access_token: null,
};
export const deepClone = obj => {
  if (typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj));
  } else {
    return obj;
  }
};

export const logout = async () => {
  console.log('Logout');
  await AsyncStorage.removeItem('@access_token');
  window.location.href = `/login`;
};

export const decode = async data => {
  if (!data) return defaultObj;
  try {
    const obj = await jwt_decode(data);
    return {
      isLogin: true,
      account: obj.account,
      email: obj.email,
      fullName: obj.fullName,
      access_token: data,
    };
  } catch (e) {
    console.log(e);
  }
};
export const deCodeLogin = token => {
  let decode = false;
  try {
    decode = jwt_decode(token);
    return {
      isLogin: decode ? true : false,
    };
  } catch {
    return false;
  }
};

export const confirmMessage = (message, cb) => {
  Alert.alert('', message, [
    {
      text: 'Cancel',
    },
    {text: 'OK', onPress: () => cb()},
  ]);
};
