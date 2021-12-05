import {SET_STATUS} from '../Type/Index';

export const setStatusAction = data => async dispatch => {
  dispatch(statusAction(data));
};

const statusAction = data => {
  return {
    type: SET_STATUS,
    payload: data,
  };
};
