import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import BottomNavbar from './BottomNavbar';
import TopBanner from './TopBanner';

const topics = [
  {
    key: 'GoodvsBad',
    title: 'Good Governance vs Bad Governance',
    genre: 'Value',
    thumbnail: require('../assets/lesson_assets/Goodgovernance.png'),
    description: 'Good governance refers to the fair, transparent, accountable, and effective management of public resources and affairs. It ensures that government actions serve the best interests of its people.',
    lessonPage: '/LessonPages/GoodvsBad',
  },
  {
    key: 'transparency',
    title: 'Transparency in Governance',
    genre: 'Principle',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Transparency ensures that government actions are open and accessible to the public.',
    lessonPage: '/LessonPages/LessonTransparency',
  },
  {
    key: 'accountability',
    title: '8 Principles of Good Governance',
    genre: 'Principle',
    thumbnail: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    description: 'Accountability means officials are answerable for their actions and decisions.',
    lessonPage: '/LessonPages/8_Principles',
  },
  {
    key: 'participation',
    title: 'Citizen Participation',
    genre: 'Practice',
    thumbnail: 'https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=400&q=80',
    description: 'Participation allows citizens to have a voice in decision-making processes.',
    lessonPage: '/LessonPages/LessonParticipation',
  },
  {
    key: 'ruleoflaw',
    title: 'Rule of Law',
    genre: 'Principle',
    thumbnail: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'Rule of law ensures that laws are applied equally and fairly to everyone.',
    lessonPage: '/LessonPages/LessonRuleOfLaw',
  },
  {
    key: 'equity',
    title: 'Equity and Inclusiveness',
    genre: 'Value',
    thumbnail: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=400&q=80',
    description: 'Equity and inclusiveness guarantee that all groups have opportunities to improve or maintain their well-being.',
    lessonPage: '/LessonPages/LessonEquity',
  },
];

export default function InfoPage() {
  const [expanded, setExpanded] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Topics & Lessons</Text>
        {topics.map((topic, idx) => (
          <View key={topic.key} style={styles.card}>
            <TouchableOpacity onPress={() => setExpanded(expanded === idx ? null : idx)} activeOpacity={0.9}>
              
              <TouchableOpacity 
                onPress={() => setSelectedImage(topic.thumbnail)}
                activeOpacity={0.9}
              >
                <Image 
                  source={typeof topic.thumbnail === 'string' ? { uri: topic.thumbnail } : topic.thumbnail}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
              </TouchableOpacity>
              <View style={styles.cardContent}>
                <Text style={styles.title}>{topic.title}</Text>
                <Text style={styles.genre}>{topic.genre}</Text>
              </View>
            </TouchableOpacity>
            {expanded === idx && (
              <View style={styles.expandedContent}>
                <Text style={styles.description}>{topic.description}</Text>
                <TouchableOpacity style={styles.readButton} onPress={() => router.push(topic.lessonPage)}>
                  <Text style={styles.readButtonText}>Read</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Modal for full image view */}
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
      <TopBanner />
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 180,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6c63ff',
    marginBottom: 18,
    marginTop: 8,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    elevation: 3,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  genre: {
    fontSize: 13,
    color: '#6c63ff',
    marginBottom: 2,
  },
  expandedContent: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  description: {
    fontSize: 15,
    color: '#444',
    marginBottom: 10,
  },
  readButton: {
    backgroundColor: '#6c63ff',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  readButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
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