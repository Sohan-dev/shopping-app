import {put, call, takeLatest} from 'redux-saga/effects';
import {HOME} from '../redux/store/TypeConstants';
import {GET, getToken} from './setup/method';

function* getHomeData() {
  try {
    let response = yield call(GET, 'products');

    yield put({
      type: HOME.GET_PRODUCT_LIST_SUCCESS.type,
      data: {
        [HOME.GET_PRODUCT_LIST_SUCCESS.value]: response,
      },
    });
  } catch (error) {
    yield put({
      type: HOME.GET_PRODUCT_LIST_FAILURE.type,
      data: {error: error},
    });
  }
}

export default {
  source: [
    (function* () {
      yield takeLatest(HOME.GET_PRODUCT_LIST_REQUEST.type, getHomeData);
    })(),
  ],
};
