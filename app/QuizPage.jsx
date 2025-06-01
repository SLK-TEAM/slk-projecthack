import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import BottomNavbar from './BottomNavbar';
import { useRouter } from 'expo-router';

const QUIZZES = [
  {
    title: 'Principles of Good Governance',
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

export default function QuizPage() {
  const [expanded, setExpanded] = useState(-1);
  const router = useRouter();

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
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
              <View style={styles.difficultyBox}>
                <Text style={styles.difficultyText}>{quiz.difficulty}</Text>
              </View>
            </View>
            {expanded === idx && (
              <Animated.View style={styles.expandedContent}>
                <Text style={styles.quizDesc}>{quiz.description}</Text>
                <TouchableOpacity style={styles.taraButton} onPress={() => router.push('/SlideQuizzes/PrinciplesOfGoodGovernance')}>
                  <Text style={styles.taraButtonText}>Tara!</Text>
                </TouchableOpacity>
              </Animated.View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 18,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6c63ff',
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
    transition: 'all 0.2s',
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
    color: '#333',
    marginBottom: 4,
  },
  quizQuestions: {
    fontSize: 14,
    color: '#888',
  },
  difficultyBox: {
    backgroundColor: '#6c63ff',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  difficultyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  expandedContent: {
    marginTop: 16,
    alignItems: 'flex-start',
  },
  quizDesc: {
    fontSize: 15,
    color: '#444',
    marginBottom: 12,
  },
  taraButton: {
    backgroundColor: '#6c63ff',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  taraButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 