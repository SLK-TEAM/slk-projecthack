import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import BottomNavbar from './BottomNavbar';
import { useRouter } from 'expo-router';
import TopBanner from './TopBanner';

const QUIZZES = [
  {
    title: '8 Principles of Good Governance',
    questions: 10,
    difficulty: 'Easy',
    description: 'Test your knowledge on the core principles and values of good governance.',
  },
  {
    title: 'Transparency & Accountability',
    questions: 12,
    difficulty: 'Medium',
    description: 'Explore how transparency and accountability shape effective governance.',
  },
  {
    title: 'Rule of Law & Participation',
    questions: 8,
    difficulty: 'Medium',
    description: 'Assess your understanding of the rule of law and citizen participation.',
  },
  {
    title: 'Equity & Inclusiveness',
    questions: 10,
    difficulty: 'Hard',
    description: 'Dive into fairness, inclusiveness, and social justice in governance.',
  },
  {
    title: 'Corporate & Digital Governance',
    questions: 15,
    difficulty: 'Hard',
    description: 'Challenge yourself on modern trends in corporate and digital governance.',
  },
];

function getDifficultyStyle(difficulty) {
  if (difficulty === 'Easy') {
    return {
      borderColor: '#00FF7F',
      backgroundColor: 'rgba(0,255,127,0.10)',
    };
  } else if (difficulty === 'Medium') {
    return {
      borderColor: '#FFD600',
      backgroundColor: 'rgba(255,214,0,0.10)',
    };
  } else if (difficulty === 'Hard') {
    return {
      borderColor: '#FF1744',
      backgroundColor: 'rgba(255,23,68,0.10)',
    };
  }
  return {};
}

export default function QuizPage() {
  const [expanded, setExpanded] = useState(-1);
  const router = useRouter();
  const taraAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (expanded !== -1) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(taraAnim, { toValue: 1.05, duration: 800, useNativeDriver: true }),
          Animated.timing(taraAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      taraAnim.setValue(1);
    }
  }, [expanded]);

  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Choose a Quiz</Text>
        {QUIZZES.map((quiz, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.card, expanded === idx && styles.cardExpanded]}
            activeOpacity={0.95}
            onPress={() => setExpanded(expanded === idx ? -1 : idx)}
          >
            <View style={styles.cardRow}>
              <View style={{flex: 1}}>
                <Text style={styles.quizTitle}>{quiz.title}</Text>
                <Text style={styles.quizQuestions}>{quiz.questions} Questions</Text>
              </View>
              <View style={[styles.difficultyBox, getDifficultyStyle(quiz.difficulty)]}>
                <Text style={[styles.difficultyText, { color: getDifficultyStyle(quiz.difficulty).borderColor }]}>{quiz.difficulty}</Text>
              </View>
            </View>
            {expanded === idx && (
              <Animated.View style={styles.expandedContent}>
                <Text style={styles.quizDesc}>{quiz.description}</Text>
                <Animated.View style={{ transform: [{ scale: taraAnim }] }}>
                  <TouchableOpacity style={styles.taraButton} onPress={() => router.push('/SlideQuizzes/PrinciplesOfGoodGovernance')}>
                    <Text style={styles.taraButtonText}>Tara!</Text>
                  </TouchableOpacity>
                </Animated.View>
              </Animated.View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TopBanner />
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    paddingTop: 190,
    paddingHorizontal: 18,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#ececec',
  },
  cardExpanded: {
    backgroundColor: '#e6eaff',
    borderColor: '#6c63ff',
    elevation: 4,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quizTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  quizQuestions: {
    fontSize: 14,
    color: '#888',
  },
  difficultyBox: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    borderWidth: 2,
  },
  difficultyText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  expandedContent: {
    marginTop: 16,
    alignItems: 'flex-start',
  },
  quizDesc: {
    fontSize: 15,
    color: '#222',
    marginBottom: 12,
  },
  taraButton: {
    backgroundColor: '#0038A8',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignItems: 'center',
    alignSelf: 'flex-end',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  taraButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
}); 