import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  StatusBar,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  View,
} from 'react-native';
HeaderBar;
import user from '../../Images/icon_user.png';
import name from '../../Images/icon_name.png';
import email from '../../Images/icon_mail.png';
import pass from '../../Images/icon_pass.png';
import {registerRequest} from '../../utils/api-request';
import {pathRegister} from '../../utils/api-path';
import HeaderBar from '../../Components/Header/Index';
import StastusBarCustom from '../../Components/StatusBar/Index';
const fWidth = Dimensions.get('window').width;
const Register = () => {
  const [info, setInfo] = useState({
    account: '',
    email: '',
    fullname: '',
    password: '',
    rePassword: '',
  });
  const [errMessage, setErrMessage] = useState({
    account: null,
    email: null,
    fullname: null,
    password: null,
    rePassword: null,
  });

  const changeInfo = name => value => {
    setInfo({
      ...info,
      [name]: value,
    });
  };

  const setDefault = () => {
    setInfo({
      account: '',
      email: '',
      fullName: '',
      password: '',
      rePassword: '',
    });
    setErrMessage({
      account: null,
      email: null,
      fullname: null,
      password: null,
      rePassword: null,
    });
  };
  const handleRegister = async () => {
    const path = pathRegister;
    const data = JSON.stringify(info);
    try {
      await registerRequest(path, data).then(rs => {
        if (rs.status === 200) {
          setDefault();
          Alert.alert(rs.result.message);
        } else if (rs.status === 422) {
          setErrMessage(rs.result.error);
          Alert.alert(rs.result.message);
        } else {
          setDefault();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#40d0a2' }} />
      <SafeAreaView style={{flex: 1, position: 'absolute',top: -20}}>
        {/* <StastusBarCustom /> */}
        <HeaderBar title="Register" />
        <ScrollView>
          <View style={styles.contents}>
            <View style={styles.wrapInput}>
              <Image source={user} style={styles.iconUser} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={info.account}
                onChangeText={changeInfo('account')}
              />
              {errMessage.account && (
                <Text style={styles.txtError}>{errMessage.account}</Text>
              )}
            </View>
            <View style={styles.wrapInput}>
              <Image source={email} style={styles.iconEmail} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={info.email}
                onChangeText={changeInfo('email')}
              />
              {errMessage.email && (
                <Text style={styles.txtError}>{errMessage.email}</Text>
              )}
            </View>
            <View style={styles.wrapInput}>
              <Image source={name} style={styles.iconName} />
              <TextInput
                style={styles.input}
                placeholder="Full name"
                value={info.fullName}
                onChangeText={changeInfo('fullName')}
              />
              {errMessage.fullname && (
                <Text style={styles.txtError}>{errMessage.fullName}</Text>
              )}
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
              {errMessage.password && (
                <Text style={styles.txtError}>{errMessage.password}</Text>
              )}
            </View>
            <View style={styles.wrapInput}>
              <Image source={pass} style={styles.iconPass} />
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Confirm Password"
                value={info.rePassword}
                onChangeText={changeInfo('rePassword')}
              />
              {errMessage.rePassword && (
                <Text style={styles.txtError}>{errMessage.rePassword}</Text>
              )}
            </View>
            <View style={styles.wrapButton}>
              <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                <Text style={styles.btn_text}>REGISTER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({
  contents: {
    flex: 5,
    alignItems: 'center',
    marginTop: 50,
  },
  wrapButton: {
    position: 'relative',
    width: 0.8 * fWidth,
    marginTop: 20,
  },
  wrapInput: {
    position: 'relative',
    width: 0.8 * fWidth,
    marginBottom: 30,
  },
  txtError: {
    position: 'absolute',
    top: 52,
    left: 0,
    color: '#f00',
    fontSize: 14,
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
  iconEmail: {
    position: 'absolute',
    top: 17,
    left: 11,
    width: 22,
    height: 17,
  },
  iconName: {
    position: 'absolute',
    top: 17,
    left: 10,
    width: 24,
    height: 19,
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
});
