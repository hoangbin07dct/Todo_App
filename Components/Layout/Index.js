import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import HeaderBar from '../../Components/Header/Index';
const Layout = ({screen, isBack, nameScreen}) => {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: '#40d0a2' }} />
      <SafeAreaView style={{flex: 1}}>
        <HeaderBar isBack={isBack} title={nameScreen} />
        <ScrollView>{screen}</ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Layout;
