/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Colors} from '../../theme/theme';
import MyStatusBar from '../../utils/StatusBar';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../utils/Loader';
import {HOME} from '../../redux/store/TypeConstants';
import {getProductList} from '../../redux/action/HomeAction';
import ProductCardComponent from '../../components/featured/ProductCardComponent';

export default function Home(props) {
  const HomeReducer = useSelector(state => state.HomeReducer);
  const dispatch = useDispatch();

  // Fetch the product list from API
  useEffect(() => {
    dispatch(getProductList());
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Loader
        visible={HomeReducer.status === HOME.GET_PRODUCT_LIST_REQUEST.type}
      />
      <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <ProductCardComponent data={HomeReducer?.productList} />
    </View>
  );
}
