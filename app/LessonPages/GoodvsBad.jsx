import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, ScrollView, Image, Animated, Modal, Dimensions } from 'react-native';
import BottomNavbar from '../BottomNavbar';

const IMAGE_URL = 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80';
const BOOKSHELVES_IMAGE = require('../../assets/Governice_bg.png');
const MEME_IMAGE = require('../../assets/lesson_assets/Goodgovernance.png'); // Placeholder, update path as needed
const LENI_IMAGE = require('../../assets/Leni_Robredo.png'); // Placeholder, update path as needed
const HONTI_IMAGE = require('../../assets/Risa_Hontiveros.jpg'); // Placeholder, update path as needed
const VICO_IMAGE = require('../../assets/Sotto.png'); // Placeholder, update path as needed

const LINKS = [
  { title: 'Accountability Lab', url: 'https://www.accountability.org/', type: 'Article', thumb: 'https://img.icons8.com/color/96/000000/open-book--v2.png' },
  { title: 'What is Accountability?', url: 'https://www.youtube.com/watch?v=example2', type: 'YouTube', thumb: 'https://img.icons8.com/color/96/000000/youtube-play.png' },
  { title: 'OECD: Accountability', url: 'https://www.oecd.org/gov/accountability.htm', type: 'Article', thumb: 'https://img.icons8.com/color/96/000000/news.png' },
];

export default function LessonAccountability() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedImage, setSelectedImage] = useState(null);
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Section 0: Bookshelves Image with Fade */}
      <Animated.Image source={BOOKSHELVES_IMAGE} style={[styles.topImage, { opacity: imageOpacity }]} />
      <Animated.ScrollView
        contentContainerStyle={styles.container}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: scrollY } } },
        ], { useNativeDriver: false })}
      >
        {/* Section 1: Title */}
        <View style={styles.sectionBox}>
          <Text style={styles.Semititle}>Gover-know Topic</Text>
          <Text style={styles.title}>Good and Bad Governance</Text>
        </View>
        {/* Section 2: Summary */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Context</Text>
          <Text style={styles.paragraph}>
          Ang good governance ay tumutukoy sa makatarungan at epektibong pamamahala ng isang bansa o organisasyon. Kabilang dito ang pagiging responsable, pagiging transparent, at pagiging accountable na paggamit ng mga yaman at proseso ng pagpapasya, kung saan isinaalang-alang ang partisipasyon ng publiko, pagsunod sa batas, at pagkilos para sa kapakanan ng nakakarami.
          </Text>
          <Text style={styles.paragraph}>
         Sa salungat na konteksto, ang bad governance ay tumutukoy sa hindi maayos, hindi makatarungan, o korap na pamamahala ng pampublikong tungkulin at yaman. Kapag an glider o institusyon ay nagpapabaya sa kapakanan ng publiko, nag reresulta ito ng kawalan ng transparency, accountability, at partisipasyon ng mamamayan, at pag-sunod sa batas.
          </Text>
        </View>
        {/* Section 3: Background */}
        <View style={styles.sectionBox}>
          
          <Image source={MEME_IMAGE} style={styles.memeImage} resizeMode="contain" />
        </View>
        {/* Section 5: People */}
        <View style={styles.sectionBox}>
          <View style={styles.personCard}>
            <TouchableOpacity onPress={() => setSelectedImage(LENI_IMAGE)}>
              <Image source={LENI_IMAGE} style={styles.personImage} resizeMode="cover" />
            </TouchableOpacity>
            <Text style={styles.personName}>Leni Robredo</Text>
            <Text style={styles.personRole}>(Former Vice President of the Philippines)</Text>
            <Text style={styles.personQuote}>
              "During her time as Vice President, Leni Robredo championed good governance through "Angat Buhay," her anti-poverty program that emphasized transparency, accountability, community engagement, and partnerships, further demonstrated by her office's clear financial reporting and efficient service delivery initiatives like "Bayanihan E-Konsulta.""
            </Text>
          </View>
          <View style={styles.personCard}>
            <TouchableOpacity onPress={() => setSelectedImage(HONTI_IMAGE)}>
              <Image source={HONTI_IMAGE} style={styles.personImage} resizeMode="cover" />
            </TouchableOpacity>
            <Text style={styles.personName}>Risa Hontiveros</Text>
            <Text style={styles.personRole}>(Incumbent Senator of the Philippines)</Text>
            <Text style={styles.personQuote}>
            "Senator Hontiveros contributes to good governance by advocating for transparency, accountability, and the rule of law through legislative efforts to combat corruption, protect human rights, and ensure proper public fund utilization, often scrutinizing government processes and expenditures."
            </Text>
          </View>
          <View style={styles.personCard}>
            <TouchableOpacity onPress={() => setSelectedImage(VICO_IMAGE)}>
              <Image source={VICO_IMAGE} style={styles.personImage} resizeMode="cover" />
            </TouchableOpacity>
            <Text style={styles.personName}>Vico Sotto </Text>
            <Text style={styles.personRole}>(Incumbent Mayor of Pasig City, Metro Manila)</Text>
            <Text style={styles.personQuote}>
            Mayor Vico Sotto gained national recognition for his commitment to good governance in Pasig City, evidenced by initiatives such as the "Ugnayan sa Pasig" online system and a local Freedom of Information ordinance, alongside streamlined processes and prudent financial management.
            </Text>
          </View>   
        </View>
        {/* Section 6: Links */}
        {/* <View style={styles.sectionBox}>
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
        </View> */}
      </Animated.ScrollView>
      <BottomNavbar />

      {/* Add Modal for full image view */}
      <Modal
        visible={selectedImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <TouchableOpacity 
          style={styles.modalContainer} 
          activeOpacity={1} 
          onPress={() => setSelectedImage(null)}
        >
          <Image 
            source={selectedImage} 
            style={styles.modalImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  topImage: {
    width: '100%',
    height: 120,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#0038a8'
    
  },
  container: {
    paddingTop: 150,
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
  Semititle:{
    color: 'gray'
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
    textAlign: 'justify'
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
    height: 300,
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
    textAlign: 'center',
  },
  personQuote: {
    fontStyle: 'italic',
    color: '#888',
    fontSize: 15,
    textAlign: 'justify',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.7,
  },
}); 