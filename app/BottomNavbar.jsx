import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

const NAV_ITEMS = [
  { route: '/HomePage', icon: require('../assets/home.png'), style: 'iconhome' },
  { route: '/InfoPage', icon: require('../assets/open-book.png'), style: 'iconbook' },
  { route: '/chat', icon: require('../assets/chat-bot.png'), style: 'botIcon', isBot: true },
  { route: '/QuizPage', icon: require('../assets/qna.png'), style: 'iconquiz' },
  { route: '/ProfilePage', icon: require('../assets/account.png'), style: 'iconprofile' },
];

export default function BottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Animated values for each nav item
  const anims = useRef(NAV_ITEMS.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    NAV_ITEMS.forEach((item, idx) => {
      const isActive = pathname === item.route;
      Animated.timing(anims[idx], {
        toValue: isActive ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    });
  }, [pathname]);

  return (
    <View style={[styles.navbar]}>
      {NAV_ITEMS.map((item, idx) => {
        const isActive = pathname === item.route;
        const scale = anims[idx].interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.15],
        });
        const bgColor = anims[idx].interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(0,0,0,0)', '#FCD116'],
        });
        const iconStyle = [
          styles[item.style],
          isActive && { tintColor: '#222' },
        ];
        const buttonStyle = item.isBot ? styles.botButton : styles.navItem;
        return (
          <TouchableOpacity
            key={item.route}
            style={buttonStyle}
            onPress={() => router.push(item.route)}
            activeOpacity={0.8}
          >
            <Animated.View
              style={{
                backgroundColor: bgColor,
                borderRadius: 32,
                padding: isActive ? 8 : 0,
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{ scale }],
              }}
            >
              <Image source={item.icon} style={iconStyle} />
            </Animated.View>
          </TouchableOpacity>
        );
      })}
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
    width: 65,
    height: 65,
    borderRadius: 30,
    backgroundColor: '#b8b8b8',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    top: -20,
    
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
    borderRadius: 32,
    backgroundColor: '#f5f5f5',
    resizeMode: 'contain',
    padding: 30,
    top: -5,
  },
}); 