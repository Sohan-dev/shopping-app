import {combineReducers} from 'redux';
import TokenReducer from './TokenReducer';
import AuthReducer from './AuthReducer';
import HomeReducer from './HomeReducer';

const allReducers = combineReducers({
  TokenReducer: TokenReducer,
  AuthReducer: AuthReducer,
  HomeReducer: HomeReducer,
});

const rootReducer = (state, action) => {
  return allReducers(state, action);
};

export default rootReducer;
