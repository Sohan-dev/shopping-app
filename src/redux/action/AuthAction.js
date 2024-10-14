import {AUTH} from '../store/TypeConstants';

export const getSignIn = payload => ({
  type: AUTH.LOGIN_REQUEST.type,
  payload,
});
export const getSignup = payload => ({
  type: AUTH.SIGNUP_REQUEST.type,
  payload,
});
export const uploadImage = payload => ({
  type: AUTH.UPLOAD_REQUEST.type,
  payload,
});
