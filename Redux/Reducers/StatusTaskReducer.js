import {SET_STATUS, LOGOUT} from '../Type/Index';

const initialState = [];

const StatusTask = (state = [...initialState], action) => {
  switch (action.type) {
    case SET_STATUS:
      return action.payload;
    case LOGOUT:
      return [];
    default:
      return state;
  }
};

export default StatusTask;
