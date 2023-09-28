import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import StackNavigator from './src/navigators/StackNavigator';
import {useDispatch} from 'react-redux';
import {getToken} from './src/redux/action/TokenAction';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getToken());
    }, 1500);
  }, []);

  return <StackNavigator />;
}
