import {HOME} from '../store/TypeConstants';

const initialState = {
  status: '',
  error: '',
  loading: false,
};

const HomeReducer = (state = initialState, action) => {
  if (HOME[action.type]) {
    if (action.type.toString().endsWith('_REQUEST')) {
      return {
        ...state,
        loading: true,
        status: HOME[action.type].type,
      };
    }
    return {
      ...state,
      loading: false,
      ...action.data,
      status: HOME[action.type].type,
    };
  } else if (action.type === 'RESET') {
    return {
      status: '',
      error: '',
      loading: false,
    };
  } else {
    return {
      ...state,
    };
  }
};

export default HomeReducer;
