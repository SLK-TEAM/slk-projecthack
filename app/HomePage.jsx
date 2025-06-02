import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import BottomNavbar from './BottomNavbar';
// import Logo from '../assets/Gover-nice Yellow-Logo.png';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Card = ({ title, description, buttonText }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDesc}>{description}</Text>
    <TouchableOpacity style={styles.cardButton}>
      <Text style={styles.cardButtonText}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);

const router = useRouter();

export default function HomePage() {
  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.scroll} pagingEnabled showsVerticalScrollIndicator={false}>
        {/* 1st Section: Splash */}
        <View style={[styles.section, styles.sectionBlue, { minHeight: SCREEN_HEIGHT }]}> 
          {/* <Image source={Logo} style={styles.logo} /> */}
          <Text style={styles.splashTitle}>Pagbati!</Text>
          <Text style={styles.splashSubtitle1}>"Tapat na pamahalaan, maunlad na bayan"</Text>
          <Text style={styles.splashSubtitle2}>#Good Governance</Text>
        </View>
        {/* 2nd Section: Explore Gover-Know! */}
        <View style={[styles.section, styles.sectionBlue, { minHeight: SCREEN_HEIGHT }]}> 
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Gover-Know!</Text>
            <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
          </View>
          <View style={styles.cardColumn}>
            <Card title="8 Principles" description="Learn about transparency." buttonText="View Topic" onPress={() => router.push('./LessonPages/8_Principles')} />
            <Card title="Gover-Know 2" description="Discover accountability." buttonText="View Topic" />
          </View>
        </View>
        {/* 3rd Section: Quiz */}
        <View style={[styles.section, styles.sectionBlue, { minHeight: SCREEN_HEIGHT }]}> 
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Want Challenge? Tara Quiz tayo!</Text>
            <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
          </View>
          <View style={styles.cardColumn}>
            <Card title="Quiz 1" description="Test your knowledge!" buttonText="Start Quiz" />
            <Card title="Quiz 2" description="Ready for more?" buttonText="Start Quiz" />
          </View>
        </View>
        {/* 4th Section: Pepits Bot */}
        <View style={[styles.section, styles.sectionWhite, styles.pepitsSection, { minHeight: SCREEN_HEIGHT }]}> 
          <Text style={styles.sectionTitle}>Curious Ka? Si Pepits ang bahala sayo!</Text>
          <View style={styles.pepitsRow}>
            <Image source={{ uri: 'https://i.imgur.com/8Km9tLL.png' }} style={styles.pepitsImage} />
            <View style={styles.pepitsCloud}>
              <Text style={styles.pepitsText}>Ask me anything about good governance!</Text>
              <TouchableOpacity style={styles.pepitsButton}>
                <Text style={styles.pepitsButtonText}>Talk Pepits</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* 5th Section: Panalo */}
        <View style={[styles.section, styles.sectionBlue, { minHeight: SCREEN_HEIGHT }]}> 
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Talagang Panalo Ka Dito!</Text>
            <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
          </View>
          <View style={styles.cardColumn}>
            <Card title="Panalo 1" description="Get rewards for learning!" buttonText="View Rewards" />
            <Card title="Panalo 2" description="Unlock achievements!" buttonText="View Rewards" />
          </View>
        </View>
      </ScrollView>
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sectionBlue: {
    backgroundColor: '#0038A8',
  },
  sectionWhite: {
    backgroundColor: '#fff',
  },
  splashTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    padding: 8,
    marginBottom: 20,
  },
  splashSubtitle1: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  splashSubtitle2: {
    margin: 15,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FCD116',
    textAlign: 'right',
    fontStyle: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeAll: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardColumn: {
    flexDirection: 'column',
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardButton: {
    backgroundColor: '#FCD116',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cardButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 3,
  },
  pepitsSection: {
    paddingBottom: 40,
  },
  pepitsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  pepitsImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#e0e0e0',
    marginRight: 16,
  },
  pepitsCloud: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  pepitsText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 8,
  },
  pepitsButton: {
    backgroundColor: '#6c63ff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  pepitsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
}); 