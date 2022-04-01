import React, {useEffect} from 'react';
import {StyleSheet, Image, View} from 'react-native';
import {images} from '../constants';

const BeforeSplash = ({navigation}) => {
  console.log('Before Splash Screen');
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Splash');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={images.logo} resizeMode="contain" />
    </View>
  );
};

export default BeforeSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#edebec',
  },
  logo: {
    width: 150,
    height: 150,
  },
});
