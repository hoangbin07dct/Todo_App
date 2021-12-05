import {LOGIN, LOGOUT} from '../Type/Index';

// const access_token = await getData();
const initialState = {
  isLogin: false,
  account: null,
  email: null,
  fullName: null,
  access_token: null,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return {
        isLogin: false,
        account: null,
        email: null,
        fullName: null,
        access_token: null,
      };
    default:
      return state;
  }
};

export default Auth;
