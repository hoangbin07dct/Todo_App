import React from 'react';
import {Link} from 'react-router-native';
import {
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconBack from '../../Images/icon_back.png';
import IconMenu from '../../Images/icon_menu.png';
import {useDispatch, useSelector} from 'react-redux';
import {setLogout} from '../../Redux/Actions/AuthActions';
const fWidth = Dimensions.get('window').width;

const HeaderBar = ({title, isBack = true}) => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin);
  const handleLogout = async () => {
    dispatch(setLogout());
    await AsyncStorage.removeItem('@access_token');
  };
  return (
    <View style={styles.header}>
      <View style={styles.shadowBottom}>
        <View style={styles.viewBack}>
          {isBack && (
            <Link component={TouchableOpacity} to="/" style={styles.btnBack}>
              <Image source={IconBack} style={{width: 20, height: 14}} />
              <Text style={styles.btnBack__text}>Back</Text>
            </Link>
          )}
        </View>

        <View style={styles.viewTitle}>
          <Text style={styles.viewTitle__text}>{title}</Text>
        </View>
        <View style={styles.viewUser}>
          {isLogin && (
            <TouchableOpacity onPress={handleLogout}>
              <Image source={IconMenu} style={{width: 25, height: 21}} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  header: {
    // marginTop: -20,
    paddingBottom: 5,
    overflow: 'hidden'
  },
  shadowBottom: {
    width: fWidth,
    height: 60,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#40d0a2',
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 5,
  },
  viewBack: {
    flex: 1,
    alignItems: 'flex-start',
  },
  viewTitle: {
    flex: 4,
    alignItems: 'center',
  },
  viewTitle__text: {
    color: '#fff',
    fontSize: 20,
  },
  viewUser: {
    flex: 1,
    alignItems: 'flex-end',
  },
  btnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnBack__text: {
    marginLeft: 5,
    color: '#fff',
    fontSize: 18,
  },
});
