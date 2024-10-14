/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  //   ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, Icons} from '../../theme/theme';
import normalize from '../../utils/Dimen';
import MyStatusBar from '../../utils/StatusBar';
import TextInputComponent from '../../components/shared/TextInput';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../components/shared/Button';
import {goBack, navigate} from '../../utils/RootNavigation';
import showErrorAlert from '../../utils/Toast';
import constants from '../../constants';
import {getSignup, uploadImage} from '../../redux/action/AuthAction';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/Loader';
import {AUTH} from '../../redux/store/TypeConstants';
import Status from '../../utils/Status';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pincode, setPinCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [locality, setLocality] = useState('');
  const [country, setCountry] = useState('');
  const [images, setImages] = useState(null);

  const dispatch = useDispatch();
  const AuthReducer = useSelector(state => state.AuthReducer);

  Status(
    AuthReducer.status,
    AUTH.SIGNUP_REQUEST.type,
    () => {
      showErrorAlert('User registered successfully');
      goBack();
    },
    () => {
      showErrorAlert(AuthReducer?.error?.response?.message);
    },
  );

  const signupUser = () => {
    if (!firstName) {
      showErrorAlert('Please enter first name');
    } else if (!email.match(constants.VALID_EMAIL_REGEXP)) {
      showErrorAlert('Please enter valid email');
    }
    // else if (!password) {
    //   showErrorAlert('Please enter password');
    // }
    else if (!lastName) {
      showErrorAlert('Please enter last name');
    } else {
      let obj = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        image: '',
        address: {
          name: firstName + lastName,
          pincode: pincode,
          phone: phoneNumber,
          address: address,
          locality: locality,
          city: 'hello',
          country: country,
          landmark: landmark,
        },
      };
      console.log(obj);
      dispatch(getSignup(obj));
    }
  };

  const extractFilename = filePath => {
    return filePath.split(Platform.OS === 'ios' ? '\\' : '/').pop();
  };

  const uploadFile = async formData => {
    console.log('inside uploadFile');
    // axios
    //   .post('http://192.168.31.206:3000/api/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then(response => {
    //     console.log(response.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    axios({
      method: 'POST',
      url: 'http://192.168.31.206:3000/api/upload',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  const openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      let obj = {
        path: image?.path,
        mime: image?.mime,
        filename: extractFilename(image.path),
      };
      const formData = new FormData();

      formData.append('filename', extractFilename(image.path));
      formData.append('mime', image.mime);
      formData.append('path', image.path);

      uploadFile(formData);

      //   dispatch(uploadImage(formData));
      setImages(obj);
      //   console.log(obj);
    });
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MyStatusBar barStyle={'dark-content'} />
        <Loader visible={AuthReducer.status === AUTH.LOGIN_REQUEST.type} />

        <View style={{backgroundColor: Colors.primaryColor}}>
          <View
            style={{
              width: '100%',
              height: normalize(40),
              elevation: 1,
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={() => goBack()}>
              <Image
                source={Icons.back}
                style={{
                  height: normalize(30),
                  width: normalize(30),
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignSelf: 'center',

              width: '100%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.DMSans_Bold,
                color: Colors.black,
                fontSize: normalize(20),
                marginTop: normalize(20),
              }}>
              Sign Up
            </Text>
            <TextInputComponent
              marginTop={normalize(20)}
              width={'90%'}
              inputTextColor={Colors.black}
              height={normalize(40)}
              placeholder={'First Name'}
              placeholderTextColor={Colors.lightblack}
              value={firstName}
              onChangeText={data => {
                setFirstName(data);
              }}
            />
            <TextInputComponent
              marginTop={normalize(20)}
              width={'90%'}
              height={normalize(40)}
              placeholder={'Last Name'}
              placeholderTextColor={Colors.lightblack}
              inputTextColor={Colors.black}
              value={lastName}
              onChangeText={data => {
                setLastName(data);
              }}
            />
            <TextInputComponent
              marginTop={normalize(20)}
              borderRadius={normalize(10)}
              width={'90%'}
              height={normalize(40)}
              inputTextColor={Colors.black}
              placeholder={'Email'}
              placeholderTextColor={Colors.lightblack}
              value={email}
              onChangeText={data => {
                setEmail(data);
              }}
            />
            <TextInputComponent
              marginTop={normalize(20)}
              width={'90%'}
              height={normalize(40)}
              placeholder={'Pincode'}
              keyboardType={'numeric'}
              inputTextColor={Colors.black}
              placeholderTextColor={Colors.lightblack}
              value={pincode}
              onChangeText={data => {
                setPinCode(data);
              }}
            />
            <TextInputComponent
              marginTop={normalize(20)}
              width={'90%'}
              height={normalize(40)}
              placeholder={'Phone Number'}
              keyboardType={'numeric'}
              inputTextColor={Colors.black}
              placeholderTextColor={Colors.lightblack}
              value={phoneNumber}
              onChangeText={data => {
                setPhoneNumber(data);
              }}
            />
            <TextInputComponent
              marginTop={normalize(20)}
              width={'90%'}
              height={normalize(40)}
              placeholder={'Address'}
              multiline={true}
              inputTextColor={Colors.black}
              placeholderTextColor={Colors.lightblack}
              value={address}
              onChangeText={data => {
                setAddress(data);
              }}
            />
            <TextInputComponent
              marginTop={normalize(20)}
              width={'90%'}
              height={normalize(40)}
              placeholder={'Landmark'}
              multiline={true}
              inputTextColor={Colors.black}
              placeholderTextColor={Colors.lightblack}
              value={landmark}
              onChangeText={data => {
                setLandmark(data);
              }}
            />
            <TextInputComponent
              marginTop={normalize(20)}
              width={'90%'}
              height={normalize(40)}
              placeholder={'Locality'}
              inputTextColor={Colors.black}
              multiline={true}
              placeholderTextColor={Colors.lightblack}
              value={locality}
              onChangeText={data => {
                setLocality(data);
              }}
            />
            <TextInputComponent
              marginTop={normalize(20)}
              width={'90%'}
              height={normalize(40)}
              placeholder={'Country'}
              multiline={true}
              inputTextColor={Colors.black}
              placeholderTextColor={Colors.lightblack}
              value={country}
              onChangeText={data => {
                setCountry(data);
              }}
            />
            {images && (
              <TouchableOpacity
                onPress={() => setImages(null)}
                style={{
                  alignSelf: 'flex-end',

                  height: 26,
                  width: 26,
                  justifyContent: 'center',
                  position: 'absolute',
                  bottom: 285,
                  right: 10,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight: '700',
                    alignSelf: 'center',
                  }}>
                  X
                </Text>
              </TouchableOpacity>
            )}
            <View
              style={{
                width: '90%',
                height: 200,
                borderWidth: 1,
                marginTop: normalize(20),
                borderColor: Colors.grey,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => openPicker()}
                style={{
                  //   backgroundColor: 'green',
                  height: '100%',
                  width: '100%',
                  borderRadius: 10,
                }}>
                <Image
                  source={images ? {uri: images?.path} : Icons.imagePlace}
                  resizeMode="cover"
                  style={{width: '100%', height: '100%', borderRadius: 10}}
                />
              </TouchableOpacity>
            </View>

            <Button
              title={'Login'}
              backgroundColor={Colors.buttonColor}
              textColor={Colors.black}
              width={'90%'}
              alignSelf={'center'}
              fontSize={normalize(14)}
              marginTop={normalize(20)}
              marginBottom={normalize(20)}
              onPress={() => signupUser()}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: normalize(10),
            marginBottom: normalize(15),
          }}>
          <Text
            style={{
              color: Colors.black,
              fontFamily: Fonts.DMSans_Medium,
              fontSize: 15,
            }}>
            Already have account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              // props.navigation.navigate('Register');
              goBack();
            }}>
            <Text
              style={{
                color: Colors.blue,
                fontFamily: Fonts.DMSans_Medium,
                fontSize: 15,
              }}>
              {' '}
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
// {
//       name: {
//         type: String,
//       },
//       pincode: {
//         type: String,
//       },
//       phone: {
//         type: String,
//       },
//       address: {
//         type: String,
//       },
//       locality: {
//         type: String,
//       },
//       city: {
//         type: String,
//       },
//       country: {
//         type: String,
//       },
//       landmark: {
//         type: String,
//       },
//     },
