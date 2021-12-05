import {pathStatus} from '../../utils/api-path';
import {getRequest} from '../../utils/api-request';
import {LOGIN, LOGOUT} from '../Type/Index';
import {setStatusAction} from './StatusTaskAction';

export const setLoginAction = data => async dispatch => {
  dispatch(loginAction(data));
  getStatus(data.access_token, dispatch);
};

const loginAction = data => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const setLogout = () => async dispatch => {
  dispatch({
    type: LOGOUT,
    payload: [],
  });
};

const getStatus = async (token, dispatch) => {
  const path = pathStatus;
  try {
    await getRequest(path, token).then(rs => {
      if (rs.status === 200) {
        dispatch(setStatusAction(rs.result));
      }
    });
  } catch (error) {
    console.log(error);
  }
};
