import React, { useRef } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import BottomNavbar from '../BottomNavbar';

const IMAGE_URL = 'https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=400&q=80';

const LINKS = [
  { title: 'Participedia', url: 'https://participedia.net/', type: 'Article', thumb: 'https://img.icons8.com/color/96/000000/open-book--v2.png' },
  { title: 'Citizen Participation Explained', url: 'https://www.youtube.com/watch?v=example3', type: 'YouTube', thumb: 'https://img.icons8.com/color/96/000000/youtube-play.png' },
  { title: 'UN: Public Participation', url: 'https://www.un.org/development/desa/public-administration/participation.html', type: 'Article', thumb: 'https://img.icons8.com/color/96/000000/news.png' },
];

export default function LessonParticipation() {
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
          <Text style={styles.title}>Citizen Participation</Text>
          <Text style={styles.genre}>Practice</Text>
        </View>
        {/* Section 2: Summary Paragraphs, Bullets, Quote */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.paragraph}>Citizen participation is the involvement of people in the decision-making processes of governance. It leads to better policies and a more engaged society.</Text>
          <Text style={styles.paragraph}>Participation can take many forms, from voting and public consultations to participatory budgeting and civic engagement initiatives. It empowers citizens and strengthens democracy.</Text>
          <Text style={styles.paragraph}>Key aspects include:</Text>
          <Text style={styles.bullet}>• Public consultations and forums.</Text>
          <Text style={styles.bullet}>• Participatory budgeting and planning.</Text>
          <Text style={styles.bullet}>• Voting and civic engagement initiatives.</Text>
          <Text style={styles.quote}>
            "The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi
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