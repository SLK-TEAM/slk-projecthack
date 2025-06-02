import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Feather';


export default function BottomNavbar() {
  const router = useRouter();


  return (
    <View style={[styles.navbar]}>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/HomePage')}>
        <Icon name="home" size={26} color="#6c63ff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/InfoPage')}>
        <Icon name="info" size={26} color="#6c63ff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.botButton} onPress={() => router.push('/chat')}>
        <Image source={{ uri: 'https://i.imgur.com/8Km9tLL.png' }} style={styles.botIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/QuizPage')}>
        <Icon name="help-circle" size={26} color="#6c63ff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/ProfilePage')}>
        <Icon name="user" size={26} color="#6c63ff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 100,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    elevation: 4,
    shadowColor: '#6c63ff',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    top: -18,
  },
  botIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e0e0e0',
  },
}); 