import {AUTH} from '../store/TypeConstants';

export const getSignIn = payload => ({
  type: AUTH.LOGIN_REQUEST.type,
  payload,
});
