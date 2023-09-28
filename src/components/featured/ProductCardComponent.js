/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, FlatList, View, Image} from 'react-native';
import {Colors, Fonts} from '../../theme/theme';
import normalize from '../../utils/Dimen';
import PropTypes from 'prop-types';

export default function ProductCardComponent(props) {
  function onRefreshList() {
    if (props.onRefreshList) {
      props.onRefreshList();
    }
  }
  function onPress(item) {
    if (props.onPress) {
      props.onPress(item);
    }
  }

  return props.data && props.data.length > 0 ? (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 20,
      }}>
      <FlatList
        data={props.data}
        showsVerticalScrollIndicator={false}
        horizontal={false}
        onRefresh={() => onRefreshList()}
        refreshing={props.refreshing}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              onPress(item);
            }}
            style={{
              width: '90%',
              height: normalize(130),
              marginTop: normalize(15),
              alignSelf: 'center',
              backgroundColor: Colors.white,
              borderRadius: normalize(10),
              shadowColor: Colors.black,
              shadowOffset: {
                width: 0,
                height: 0.5,
              },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 10,
              marginBottom: index === props.data.length - 1 ? normalize(45) : 0,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                resizeMode="contain"
                source={{uri: item.image}}
                style={{
                  height: normalize(100),
                  width: normalize(100),
                  marginTop: normalize(20),
                }}
              />
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontFamily: Fonts.DMSans_Bold,
                    color: Colors.black,
                    fontSize: normalize(13),
                    width: normalize(160),
                    marginTop: normalize(15),
                  }}>
                  {item.title}
                </Text>

                <Text
                  numberOfLines={3}
                  style={{
                    fontFamily: Fonts.DMSans_Regular,
                    fontSize: normalize(11.5),
                    width: normalize(160),
                    // height: normalize(100),
                    color: Colors.black,
                    marginTop: normalize(10),
                  }}>
                  {item.description}
                </Text>
                <View style={{flexDirection: 'row', marginTop: normalize(15)}}>
                  <Text
                    style={{
                      fontFamily: Fonts.DMSans_Regular,
                      fontSize: normalize(12),
                      height: normalize(100),
                      color: Colors.black,
                    }}>
                    Price:
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.DMSans_Bold,
                      fontSize: normalize(12),
                      // width: normalize(160),
                      height: normalize(100),
                      color: Colors.blue,
                      marginLeft: normalize(2),
                    }}>
                    {'₹' + item.price}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => {
          return item.jobId;
        }}
      />
    </View>
  ) : (
    <View
      style={{
        alignSelf: 'center',
        justifyContent: 'center',
        height: normalize(100),
        width: normalize(150),
        marginTop: normalize(20),
      }}>
      <Text
        style={{
          fontSize: normalize(16),
          color: Colors.black,
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        {'No Data Available'}
      </Text>
    </View>
  );
}

ProductCardComponent.propTypes = {
  data: PropTypes.array,
  refreshing: PropTypes.bool,
  onRefreshList: PropTypes.func,
  onDelete: PropTypes.func,
};

ProductCardComponent.defaultProps = {
  data: [],
  refreshing: false,
  onRefreshList: null,
  onDelete: null,
};