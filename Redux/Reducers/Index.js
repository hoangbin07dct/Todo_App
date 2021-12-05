import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import StatusTask from './StatusTaskReducer';

export default combineReducers({
  auth: AuthReducer,
  status: StatusTask,
});
