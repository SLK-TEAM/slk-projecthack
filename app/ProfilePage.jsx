import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomNavbar from './BottomNavbar';

export default function ProfilePage() {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.text}>Profile Page</Text>
      </View>
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    color: '#6c63ff',
  },
}); 