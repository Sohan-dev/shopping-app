import {put, call, takeLatest} from 'redux-saga/effects';
import EncryptedStorage from 'react-native-encrypted-storage';
import constants from '../constants/index';
import {AUTH, TOKEN} from '../redux/store/TypeConstants';
import {POST, POST_FORM} from './setup/method';

function* getSignin(action) {
  try {
    yield put({
      type: AUTH.LOGIN_SUCCESS.type,
      data: {
        [AUTH.LOGIN_SUCCESS.value]: action.payload,
      },
    });
    yield put({
      type: TOKEN.SET_TOKEN_SUCCESS.type,
      data: {[TOKEN.SET_TOKEN_SUCCESS.value]: action.payload.token},
    });

    yield call(
      EncryptedStorage.setItem,
      constants.TOKEN,
      JSON.stringify({token: action.payload.token}),
    );
  } catch (error) {
    yield put({
      type: AUTH.LOGIN_FAILURE.type,
      data: {error: error},
    });
  }
}

function* getSignup(action) {
  try {
    let response = yield call(POST, 'register', action.payload, '');
    console.log(response, 'RESPP');
    yield put({
      type: AUTH.SIGNUP_SUCCESS.type,
      data: {
        [AUTH.SIGNUP_SUCCESS.value]: response,
        signinmessage: response?.message,
      },
    });
  } catch (error) {
    yield put({
      type: AUTH.SIGNUP_FAILURE.type,
      data: {error: error},
    });
  }
}

function* uploadImage(action) {
  try {
    let response = yield call(POST_FORM, 'upload', action.payload, '');
    console.log(response, 'RESPP');
    yield put({
      type: AUTH.UPLOAD_SUCCESS.type,
      data: {
        [AUTH.UPLOAD_SUCCESS.value]: response,
        // signinmessage: response?.message,
      },
    });
  } catch (error) {
    yield put({
      type: AUTH.UPLOAD_FAILURE.type,
      data: {error: error},
    });
  }
}

export default {
  source: [
    (function* () {
      yield takeLatest(AUTH.LOGIN_REQUEST.type, getSignin);
    })(),
    (function* () {
      yield takeLatest(AUTH.SIGNUP_REQUEST.type, getSignup);
    })(),
    (function* () {
      yield takeLatest(AUTH.UPLOAD_REQUEST.type, uploadImage);
    })(),
  ],
};
