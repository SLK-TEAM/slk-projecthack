import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';


export default function BottomNavbar() {
  const router = useRouter();


  return (
    <View style={[styles.navbar]}>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/HomePage')}>
        <Image source={require('../assets/home.png')} style={styles.iconhome} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/InfoPage')}>
        <Image source={require('../assets/open-book.png')} style={styles.iconbook} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.botButton} onPress={() => router.push('/chat')}>
        <Image source={require('../assets/chat-bot.png')} style={styles.botIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/QuizPage')}>
        <Image source={require('../assets/qna.png')} style={styles.iconquiz} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/ProfilePage')}>
        <Image source={require('../assets/account.png')} style={styles.iconprofile} />
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
  iconhome: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  iconbook: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  iconquiz: {
    width: 33,
    height: 33,
    resizeMode: 'contain',
  },
  iconprofile: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  botIcon: {
    width: 40,
    height: 40,
    borderRadius: 22,
    backgroundColor: '#e0e0e0',
    resizeMode: 'contain',
  },
}); 