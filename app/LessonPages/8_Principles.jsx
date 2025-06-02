import React, { useRef } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import BottomNavbar from '../BottomNavbar';

const IMAGE_URL = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80';
const BOOKSHELVES_IMAGE = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80'; // Bookshelves
const MEME_IMAGE = require('../../assets/meme1.jpg'); // Placeholder, update path as needed
const LENI_IMAGE = require('../../assets/leni.jpg'); // Placeholder, update path as needed
const SERENO_IMAGE = require('../../assets/sereno.jpg'); // Placeholder, update path as needed

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
      {/* Section 0: Bookshelves Image with Fade */}
      <Animated.Image source={{ uri: BOOKSHELVES_IMAGE }} style={[styles.topImage, { opacity: imageOpacity }]} />
      <Animated.ScrollView
        contentContainerStyle={styles.container}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ], { useNativeDriver: false })}
      >
        {/* Section 1: Title */}
        <View style={styles.sectionBox}>
          <Text style={styles.title}>8 Principles of Good Governance</Text>
        </View>
        {/* Section 2: Summary */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.paragraph}>
            Good governance is a holistic approach to managing public affairs that emphasizes ethical conduct, effectiveness, and the well-being of all citizens.
          </Text>
        </View>
        {/* Section 3: Meme */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Meme</Text>
          <Image source={MEME_IMAGE} style={styles.memeImage} resizeMode="contain" />
        </View>
        {/* Section 4: TL;DR */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>TL;DR – 8 Principles of Good Governance</Text>
          <View style={styles.tldrItem}><Text style={styles.tldrPrinciple}>Participation</Text><Text style={styles.tldrText}> – Everyone should have a say in decisions, whether directly or through representatives. {'\n'}<Text style={styles.tldrExample}>Example:</Text> Public forums and online petition systems help people voice opinions.</Text></View>
          <View style={styles.tldrItem}><Text style={styles.tldrPrinciple}>Rule of Law</Text><Text style={styles.tldrText}> – Laws must apply equally to all and be enforced fairly. {'\n'}<Text style={styles.tldrExample}>Example:</Text> An independent judiciary ensures no one is above the law, even officials.</Text></View>
          <View style={styles.tldrItem}><Text style={styles.tldrPrinciple}>Transparency</Text><Text style={styles.tldrText}> – Government actions and decisions must be open and accessible. {'\n'}<Text style={styles.tldrExample}>Example:</Text> Publishing budgets and open meetings build public trust.</Text></View>
          <View style={styles.tldrItem}><Text style={styles.tldrPrinciple}>Responsiveness</Text><Text style={styles.tldrText}> – Institutions must quickly and appropriately address public needs. {'\n'}<Text style={styles.tldrExample}>Example:</Text> Quick disaster response and feedback systems show governments care.</Text></View>
          <View style={styles.tldrItem}><Text style={styles.tldrPrinciple}>Consensus Oriented</Text><Text style={styles.tldrText}> – Diverse views should be mediated to reach broad agreement. {'\n'}<Text style={styles.tldrExample}>Example:</Text> Community consultations before projects or policies.</Text></View>
          <View style={styles.tldrItem}><Text style={styles.tldrPrinciple}>Equity & Inclusiveness</Text><Text style={styles.tldrText}> – Everyone, especially marginalized groups, should benefit and participate. {'\n'}<Text style={styles.tldrExample}>Example:</Text> Disability-friendly services and multilingual access.</Text></View>
          <View style={styles.tldrItem}><Text style={styles.tldrPrinciple}>Effectiveness & Efficiency</Text><Text style={styles.tldrText}> – Use resources wisely for best results. {'\n'}<Text style={styles.tldrExample}>Example:</Text> Digital systems reduce delays and improve service.</Text></View>
          <View style={styles.tldrItem}><Text style={styles.tldrPrinciple}>Accountability</Text><Text style={styles.tldrText}> – Leaders must explain their actions and face consequences. {'\n'}<Text style={styles.tldrExample}>Example:</Text> Audits, elections, and whistleblower protection ensure responsibility.</Text></View>
        </View>
        {/* Section 5: People */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>People</Text>
          <View style={styles.personCard}>
            <Image source={LENI_IMAGE} style={styles.personImage} resizeMode="cover" />
            <Text style={styles.personName}>Leni Robredo</Text>
            <Text style={styles.personRole}>(Vice President of the Philippines, 2016–2022)</Text>
            <Text style={styles.personQuote}>
              “Our kind of governance must be responsive, inclusive, and empowering. That is how we bring government closer to the people.”
            </Text>
          </View>
          <View style={styles.personCard}>
            <Image source={SERENO_IMAGE} style={styles.personImage} resizeMode="cover" />
            <Text style={styles.personName}>Maria Lourdes Sereno</Text>
            <Text style={styles.personRole}>(Chief Justice of the Supreme Court, 2012–2018)</Text>
            <Text style={styles.personQuote}>
              “The rule of law must be strong enough to withstand the forces of populism and impunity.”
            </Text>
          </View>
        </View>
        {/* Section 6: Links */}
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
  principleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    elevation: 2,
  },
  principleTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444',
  },
  principleExplanation: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
  },
  exampleTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#6c63ff',
  },
  exampleText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
  },
  memeImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: '#eee',
  },
  tldrItem: {
    marginBottom: 12,
  },
  tldrPrinciple: {
    fontWeight: 'bold',
    color: '#6c63ff',
    fontSize: 15,
  },
  tldrText: {
    fontSize: 15,
    color: '#333',
  },
  tldrExample: {
    color: '#888',
    fontStyle: 'italic',
  },
  personCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    alignItems: 'center',
    elevation: 2,
  },
  personImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    backgroundColor: '#eee',
  },
  personName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  personRole: {
    fontSize: 13,
    color: '#6c63ff',
    marginBottom: 6,
  },
  personQuote: {
    fontStyle: 'italic',
    color: '#888',
    fontSize: 15,
    textAlign: 'center',
  },
}); 