import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Dimensions } from 'react-native';
import pnglogo from '../assets/pnglogo.png';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function LoadingScreen({ message, onFinish }) {
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: -SCREEN_HEIGHT,
      duration: 1800,
      delay: 2000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 0);
    });
  }, [slideAnim, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { transform: [{ translateY: slideAnim }] }]}> 
        <Image source={pnglogo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.message}>{message}</Text>
       
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0038A8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },
  message: {
    fontSize: 24,
    color: '#FCD116',
    fontWeight: 'bold',
    textAlign: 'center',
  },
}); 