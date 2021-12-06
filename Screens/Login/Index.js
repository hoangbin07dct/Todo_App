import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-native';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../../Images/login.png';
import user from '../../Images/icon_user.png';
import pass from '../../Images/icon_pass.png';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest} from '../../utils/api-request';
import {pathLogin} from '../../utils/api-path';
import {setLoginAction} from '../../Redux/Actions/AuthActions';
import {decode} from '../../utils/helpers';

const fWidth = Dimensions.get('window').width;

const Login = () => {
  const isLogin = useSelector(state => state.auth.isLogin);
  return isLogin ? <Redirect to={'/'} /> : <LayoutLogin />;
};
const LayoutLogin = () => {
  // StatusBar.setHidden(true);
  const dispatch = useDispatch();
  const [info, setInfo] = useState({
    account: '',
    password: '',
  });

  //Methods

  const storeData = async data => {
    try {
      await AsyncStorage.setItem('@access_token', data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeInfo = name => value => {
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    const path = pathLogin;
    const data = JSON.stringify(info);
    try {
      await loginRequest(path, data).then(async rs => {
        if (rs.status === 200) {
          const data = await decode(rs.result.data.access_token);
          await storeData(rs.result.data.access_token);
          dispatch(setLoginAction(data));
        } else {
          Alert.alert(rs.result.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Render
  return (
    <>
      <StatusBar backgroundColor="#fff" hidden={true} />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.wrapHeader}>
            <Image source={logo} style={{width: 80, height: 80}} />
            <Text style={styles.title}>Welcome</Text>
          </View>
          <View style={styles.wrapInput}>
            <Image source={user} style={styles.iconUser} />
            <TextInput
              style={styles.input}
              placeholder="Account or Email"
              value={info.account}
              onChangeText={changeInfo('account')}
            />
          </View>
          <View style={styles.wrapInput}>
            <Image source={pass} style={styles.iconPass} />
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
              value={info.password}
              onChangeText={changeInfo('password')}
            />
          </View>
          <View style={styles.wrapInput}>
            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
              <Text style={styles.btn_text}>LOGIN</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.createLink}>
            <Link component={TouchableOpacity} to="/register">
              <Text style={styles.createLink__text}>Create an Account</Text>
            </Link>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  wrapHeader: {
    width: 0.9 * fWidth,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapInput: {
    position: 'relative',
    width: 0.8 * fWidth,
    marginBottom: 25,
  },
  iconUser: {
    position: 'absolute',
    top: 13,
    left: 10,
    width: 20,
    height: 23,
  },
  iconPass: {
    position: 'absolute',
    top: 13,
    left: 11,
    width: 20,
    height: 23,
  },
  title: {
    marginTop: 10,
    color: '#40d0a2',
    fontSize: 35,
    lineHeight: 35,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
  },
  input: {
    width: 0.8 * fWidth,
    height: 50,
    padding: 10,
    paddingLeft: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    fontSize: 18,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 4,
    backgroundColor: '#40d0a2',
  },
  btn_text: {
    fontSize: 18,
    color: '#fff',
  },
  createLink: {
    marginTop: 10,
  },
  createLink__text: {
    fontSize: 18,
    color: '#40d0a2',
  },
});

export default Login;
