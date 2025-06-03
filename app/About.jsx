import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';


import dev1 from '../assets/jet.jpg';
import dev2 from '../assets/kurt.jpg';
import dev3 from '../assets/luke.jpg';
import dev4 from '../assets/luis.jpg';
import jsLogo from '../assets/javascript.png';
import reactLogo from '../assets/react-native.png';
import expoLogo from '../assets/expopng.png';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FAQS = [
  {
    q: 'What is Gover-Nice?',
    a: 'Gover-Nice is an information-based app designed to educate users about the principles and practices of good governance.'
  },
  {
    q: 'How can I track my progress?',
    a: 'Your progress is automatically tracked as you complete lessons and quizzes. You can view your progress on your profile page.'
  },
  {
    q: 'Is Gover-Nice free to use?',
    a: 'Yes, Gover-Nice is completely free and accessible to everyone interested in learning about good governance.'
  }
];

const TOOLS = [
  { img: jsLogo, label: 'JavaScript' },
  { img: reactLogo, label: 'React Native' },
  { img: expoLogo, label: 'Expo' },
  
];

export default function About() {
  const router = useRouter();
  const carouselRef = useRef(null);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Overview Section */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.paragraph}>
          Good governance is the process by which public institutions conduct public affairs, manage public resources, and guarantee the realization of human rights. It is characterized by transparency, accountability, participation, responsiveness, and the rule of law, ensuring that the voices of the most vulnerable are heard in decision-making. Good governance is essential for building trust, promoting sustainable development, and improving the quality of life for all citizens.
        </Text>
      </View>
      {/* FAQs Section */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>FAQs</Text>
        {FAQS.map((faq, idx) => (
          <View key={idx} style={styles.faqBox}>
            <Text style={styles.faqQ}>{faq.q}</Text>
            <Text style={styles.faqA}>{faq.a}</Text>
          </View>
        ))}
      </View>
      {/* Support Us Section */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Support Us</Text>
        <Text style={styles.devLabel}>Developers</Text>
        <View style={styles.devRow}>
          <Image source={dev1} style={styles.devImg} />
          <Image source={dev2} style={styles.devImg} />
          <Image source={dev3} style={styles.devImg} />
          <Image source={dev4} style={styles.devImg} />
        </View>
        <Text style={styles.toolsLabel}>Languages & Tools We Use</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
          {TOOLS.map((tool, idx) => (
            <View key={idx} style={{ alignItems: 'center', marginHorizontal: 8 }}>
              <Image source={tool.img} style={styles.toolImg} />
              <Text style={styles.toolLabel}>{tool.label}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>{'< Back'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  sectionBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 22,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0038A8',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
    textAlign: 'justify',
  },
  faqBox: {
    marginBottom: 14,
  },
  faqQ: {
    fontWeight: 'bold',
    color: '#0038A8',
    fontSize: 16,
    marginBottom: 2,
  },
  faqA: {
    color: '#444',
    fontSize: 15,
    marginBottom: 2,
    marginLeft: 8,
  },
  devLabel: {
    fontWeight: 'bold',
    color: '#0038A8',
    fontSize: 16,
    marginBottom: 8,
  },
  devRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  devImg: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  toolsLabel: {
    fontWeight: 'bold',
    color: '#0038A8',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  toolImg: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  toolLabel: {
    fontSize: 15,
    color: '#0038A8',
    fontWeight: 'bold',
  },
  backBtn: {
    backgroundColor: '#0038A8',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 32,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  backBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 