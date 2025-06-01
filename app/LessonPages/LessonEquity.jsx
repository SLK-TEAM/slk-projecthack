import React, { useRef } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import BottomNavbar from '../BottomNavbar';

const IMAGE_URL = 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80';

const LINKS = [
  { title: 'UN on Equity and Inclusiveness', url: 'https://www.un.org/development/desa/socialperspectiveondevelopment/issues/equity-and-inclusiveness.html', type: 'Article', thumb: 'https://img.icons8.com/color/96/000000/open-book--v2.png' },
  { title: 'Equity and Inclusion', url: 'https://www.youtube.com/watch?v=example5', type: 'YouTube', thumb: 'https://img.icons8.com/color/96/000000/youtube-play.png' },
  { title: 'World Bank: Equity', url: 'https://www.worldbank.org/en/topic/socialinclusion', type: 'Article', thumb: 'https://img.icons8.com/color/96/000000/news.png' },
];

export default function LessonEquity() {
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
          <Text style={styles.title}>Equity and Inclusiveness</Text>
          <Text style={styles.genre}>Value</Text>
        </View>
        {/* Section 2: Summary Paragraphs, Bullets, Quote */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.paragraph}>Equity and inclusiveness in governance ensure that all groups, especially the most vulnerable, have opportunities to improve or maintain their well-being.</Text>
          <Text style={styles.paragraph}>Inclusive policies address the needs of marginalized groups, promote diversity, and prevent discrimination. Equity is essential for social justice and sustainable development.</Text>
          <Text style={styles.paragraph}>Key aspects include:</Text>
          <Text style={styles.bullet}>• Policies address the needs of marginalized groups.</Text>
          <Text style={styles.bullet}>• Equal access to public services and opportunities.</Text>
          <Text style={styles.bullet}>• Promoting diversity and preventing discrimination.</Text>
          <Text style={styles.quote}>
            "Injustice anywhere is a threat to justice everywhere." - Martin Luther King Jr.
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