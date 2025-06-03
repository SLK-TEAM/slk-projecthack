import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import BottomNavbar from './BottomNavbar';
import TopBanner from './TopBanner';
import Pepits from '../assets/chat-bot.png'
// <<<<<<< HEAD
// =======
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';

// >>>>>>> c1c20d026d92f85ab82533a0d66cbe6cd5a6b3bb

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Card = ({ title, description, buttonText, onPress, cardStyle, textStyle, buttonStyle, buttonTextStyle }) => (
  <View style={[styles.card, cardStyle]}> 
    <View style={styles.cardTextContainer}>
      <Text style={[styles.cardTitle, textStyle]}>{title}</Text>
      <Text style={[styles.cardDesc, textStyle]}>{description}</Text>
    </View>
    <TouchableOpacity style={[styles.cardButton, buttonStyle]} onPress={onPress}>
      <Text style={[styles.cardButtonText, buttonTextStyle]}>{buttonText}</Text>
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
            <TouchableOpacity onPress={() => router.push('/InfoPage')}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
          </View>
          <View style={styles.cardColumn}>
            <Card 
              title="8 Principles" 
              description="Principles to build Good Governance." 
              buttonText="View Topic" 
              onPress={() => router.push('./LessonPages/8_Principles')} 
            />
            <Card 
              title="Good vs. Bad Governance" 
              description="Discover accountability." 
              buttonText="View Topic" 
              onPress={() => router.push('./LessonPages/GoodvsBad')}
            />
          </View>
        </View>
        {/* 3rd Section: Quiz */}
        <View style={[styles.section, styles.sectionBlue, { minHeight: SCREEN_HEIGHT }]}> 
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Want Challenge? Tara Quiz tayo!</Text>
            <TouchableOpacity onPress={() => router.push('/QuizPage')}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
          </View>
          <View style={styles.cardColumn}>
            <Card 
              title="Easy Quiz" 
              description="8 Principles of Good Governance" 
              buttonText="Start Quiz" 
              onPress={() => router.push('./SlideQuizzes/PrinciplesOfGoodGovernance')}
            />
            <Card title="Intermediate Quiz" description="Good vs. Bad Governance" buttonText="Start Quiz" />
          </View>
        </View>
        {/* 4th Section: Pepits Bot */}
        <View style={[styles.section, styles.sectionBlue, styles.pepitsSection, { minHeight: SCREEN_HEIGHT }]}> 
          <Text style={styles.sectionTitle}>Curious Ka? Si Pepits ang bahala sayo!</Text>
          <View style={styles.pepitsRow}>
            <Image source={Pepits} style={styles.pepitsImage} />
            <View style={styles.pepitsCloud}>
              <Text style={styles.pepitsText}>Kamusta! Ako si Pepits.</Text>
              <Text style={styles.pepitsText}>Kinagagalak kong makilala ka, Masaya rin ako na interesado ka din alamin kung ano ang Good Governance. Kausapin mo lang ako kung gusto mo pang maintindihan ng lubos ito.</Text>
              <TouchableOpacity style={styles.pepitsButton} onPress={() => router.push('/chat')}>
                <Text 
                  style={styles.pepitsButtonText}>Talk Pepits
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* 5th Section: Panalo */}
        <View style={[styles.section, styles.sectionWhite, { minHeight: SCREEN_HEIGHT }]}> 
          {/* First part: Talagang Panalo Ka Dito! */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, styles.blueText]}>Talagang Panalo Ka Dito!</Text>
            <TouchableOpacity onPress={() => router.push('/ProfilePage')}><Text style={[styles.seeAll, styles.blueText]}>See All</Text></TouchableOpacity>
          </View>
          <View style={styles.cardColumn}>
            <Card 
              title="Earn 10,000 points!" 
              description="Get rewards for learning!" 
              buttonText="View Rewards" 
              cardStyle={styles.blueCard}
              textStyle={styles.blueCardText}
              buttonStyle={styles.blueCardButton}
              buttonTextStyle={styles.blueCardButtonText}
              onPress={() => router.push('/ProfilePage')}
            />
          </View>
          {/* Second part: More Points? Just Take a Quiz! */}
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, styles.blueText]}>More Points? Just Take a Quiz!</Text>
            <TouchableOpacity onPress={() => router.push('/QuizPage')}><Text style={[styles.seeAll, styles.blueText]}>See All</Text></TouchableOpacity>
          </View>
          <View style={styles.cardColumn}>
            <Card 
              title="Take a Quiz!" 
              description="Take quizzes and boost your points." 
              buttonText="Take Quiz" 
              cardStyle={styles.blueCard}
              textStyle={styles.blueCardText}
              buttonStyle={styles.blueCardButton}
              buttonTextStyle={styles.blueCardButtonText}
              onPress={() => router.push('/QuizPage')}
            />
          </View>
        </View>
      </ScrollView>
      <TopBanner />
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
    backgroundColor: '#F0F0F0',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTextContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    textAlign: 'left',
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    textAlign: 'left',
  },
  cardButton: {
    backgroundColor: '#FCD116',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 16,
    alignSelf: 'center',
  },
  cardButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 3,
  },
  blueCard: {
    backgroundColor: '#0038A8',
  },
  blueCardText: {
    color: '#FFF',
  },
  blueCardButton: {
    backgroundColor: '#FCD116',
  },
  blueCardButtonText: {
    color: '#0038A8',
  },
  blueText: {
    color: '#0038A8',
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
    backgroundColor: '#FCD116',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  pepitsButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
}); 