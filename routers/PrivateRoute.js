import React from 'react';
import {Route, Redirect} from 'react-router-native';
import {useSelector} from 'react-redux';
import Layout from '../Components/Layout/Index';
const PrivateRoute = ({component: Component, isBack, nameScreen, ...rest}) => {
  const isLogin = useSelector(state => state.auth.isLogin);
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? (
          <Layout
            screen={<Component {...props} />}
            isBack={isBack}
            nameScreen={nameScreen}
          />
        ) : (
          <Redirect to={'/login'} />
        )
      }
    />
  );
};

export default PrivateRoute;
