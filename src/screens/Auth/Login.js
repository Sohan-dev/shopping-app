/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from 'react-native';
import {Fonts, Icons, Colors} from '../../theme/theme';
import normalize from '../../utils/Dimen';
import MyStatusBar from '../../utils/StatusBar';
import Loader from '../../utils/Loader';
import {useDispatch, useSelector} from 'react-redux';
import Status from '../../utils/Status';
import showErrorAlert from '../../utils/Toast';
import {AUTH} from '../../redux/store/TypeConstants';
import Button from '../../components/shared/Button';
import TextInputComponent from '../../components/shared/TextInput';
import constants from '../../constants';
import {getSignIn} from '../../redux/action/AuthAction';
import {navigate} from '../../utils/RootNavigation';

export default function Login(props) {
  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  Status(
    AuthReducer.status,
    AUTH.LOGIN_REQUEST.type,
    () => {
      showErrorAlert(AuthReducer?.signinmessage);
    },
    () => {
      showErrorAlert(AuthReducer?.error?.response?.data?.message);
    },
  );

  const loginUser = () => {
    if (!userName) {
      showErrorAlert('Please enter email');
    } else if (!userName.match(constants.VALID_EMAIL_REGEXP)) {
      showErrorAlert('Please enter valid email');
    } else if (!password) {
      showErrorAlert('Please enter password');
    } else {
      let obj = {
        token: 'FlsEJIqeZtwMGp9lwAcj',
        username: userName,
      };
      console.log('first');
      dispatch(getSignIn(obj));
    }
  };

  return (
    <View style={{flex: 1}}>
      <Loader visible={AuthReducer.status === AUTH.LOGIN_REQUEST.type} />
      <MyStatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.primaryColor}
      />
      <View
        style={{
          backgroundColor: Colors.primaryColor,
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text
          style={{
            fontSize: normalize(36),
            color: Colors.black,
            textAlign: 'center',
            fontFamily: Fonts.DMSans_Bold,
          }}>
          Log In
        </Text>

        <TextInputComponent
          marginTop={normalize(20)}
          borderRadius={normalize(10)}
          width={'90%'}
          height={normalize(40)}
          placeholder={'Email'}
          placeholderTextColor={Colors.lightblack}
          value={userName}
          onChangeText={data => {
            setUserName(data);
          }}
        />
        <TextInputComponent
          marginTop={normalize(20)}
          width={'90%'}
          height={normalize(40)}
          placeholder={'Password'}
          placeholderTextColor={Colors.lightblack}
          isSecure={true}
          eye={true}
          value={password}
          onChangeText={data => {
            setPassword(data);
          }}
        />

        <Button
          title={'Login'}
          backgroundColor={Colors.buttonColor}
          textColor={Colors.black}
          width={'90%'}
          alignSelf={'center'}
          fontSize={normalize(14)}
          marginTop={normalize(20)}
          onPress={() => loginUser()}
        />

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: normalize(20),
          }}>
          <Text
            style={{
              color: Colors.black,
              fontFamily: Fonts.DMSans_Medium,
              fontSize: 15,
            }}>
            Don't have account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              // props.navigation.navigate('Register');
              navigate('Register');
            }}>
            <Text
              style={{
                color: Colors.blue,
                fontFamily: Fonts.DMSans_Medium,
                fontSize: 15,
              }}>
              {' '}
              Register
            </Text>
          </TouchableOpacity>
        </View>

        {/* <View style={{marginTop: normalize(20)}}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              height: normalize(40),
              width: '70%',
              backgroundColor: Colors.buttonColor,
              flexDirection: 'row',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: normalize(20),
              marginTop: normalize(20),
            }}>
            <Text
              style={{
                fontFamily: Fonts.DMSans_Regular,
                color: Colors.black,
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}
