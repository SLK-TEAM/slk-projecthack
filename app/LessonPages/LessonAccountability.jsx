import React, { useRef } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import BottomNavbar from '../BottomNavbar';

const IMAGE_URL = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80';

const LINKS = [
  { title: 'Accountability Lab', url: 'https://www.accountability.org/', type: 'Article', thumb: 'https://img.icons8.com/color/96/000000/open-book--v2.png' },
  { title: 'What is Accountability?', url: 'https://www.youtube.com/watch?v=example2', type: 'YouTube', thumb: 'https://img.icons8.com/color/96/000000/youtube-play.png' },
  { title: 'OECD: Accountability', url: 'https://www.oecd.org/gov/accountability.htm', type: 'Article', thumb: 'https://img.icons8.com/color/96/000000/news.png' },
];

export default function LessonAccountability() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Animated.Image source={{ uri: IMAGE_URL }} style={[styles.topImage, { opacity: imageOpacity }]} />
      <Animated.ScrollView
        contentContainerStyle={styles.container}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ], { useNativeDriver: false })}
      >
        {/* Section 1: Title & Genre */}
        <View style={styles.sectionBox}>
          <Text style={styles.title}>Accountability Mechanisms</Text>
          <Text style={styles.genre}>Principle</Text>
        </View>
        {/* Section 2: Summary Paragraphs, Bullets, Quote */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.paragraph}>Accountability in governance means that officials are answerable for their actions and decisions. It ensures that power is exercised responsibly and that there are consequences for misuse.</Text>
          <Text style={styles.paragraph}>Effective accountability mechanisms include regular audits, clear reporting lines, and opportunities for citizens to report misconduct. These mechanisms help prevent abuse of power and corruption.</Text>
          <Text style={styles.paragraph}>Key aspects include:</Text>
          <Text style={styles.bullet}>• Regular audits and reviews of government activities.</Text>
          <Text style={styles.bullet}>• Clear reporting lines and responsibilities.</Text>
          <Text style={styles.bullet}>• Mechanisms for citizens to report misconduct.</Text>
          <Text style={styles.quote}>
            "Responsibility is the price of freedom." - Elbert Hubbard
          </Text>
        </View>
        {/* Section 3: Links */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Useful Links</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop: 8}}>
            {LINKS.map((link, idx) => (
              <TouchableOpacity key={idx} style={styles.linkCard} onPress={() => Linking.openURL(link.url)}>
                <Image source={{ uri: link.thumb }} style={styles.linkThumb} />
                <Text style={styles.linkTitle}>{link.title}</Text>
                <Text style={styles.linkType}>{link.type}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.ScrollView>
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  topImage: {
    width: '100%',
    height: 180,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  container: {
    paddingTop: 190,
    paddingBottom: 90,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  sectionBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 18,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  genre: {
    fontSize: 13,
    color: '#6c63ff',
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
  },
  paragraph: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
  },
  bullet: {
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
    marginBottom: 3,
  },
  quote: {
    fontStyle: 'italic',
    color: '#888',
    marginTop: 10,
    marginBottom: 2,
    fontSize: 15,
    textAlign: 'right',
  },
  linkCard: {
    width: 180,
    backgroundColor: '#f7f7ff',
    borderRadius: 12,
    marginRight: 14,
    padding: 12,
    alignItems: 'center',
    elevation: 1,
  },
  linkThumb: {
    width: 48,
    height: 48,
    marginBottom: 8,
    borderRadius: 8,
  },
  linkTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 2,
  },
  linkType: {
    fontSize: 13,
    color: '#6c63ff',
  },
}); 