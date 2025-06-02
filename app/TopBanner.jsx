import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function TopBanner() {
  return (
    <View style={styles.bannerContainer}>
      <Image source={require('../assets/pnglogo.png')} style={styles.logo} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#0038A8',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 200,
  },
  logo: {
    width: 190,
    height: 180,
  },
}); 