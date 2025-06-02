import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useRouter, useLocalSearchParams } from 'expo-router';
import BottomNavbar from '../BottomNavbar';
import TopBanner from '../TopBanner';

const QUESTIONS = [
  {
    scenario: "A city mayor regularly publishes the city's budget and spending reports for the public to see.",
    answer: 'Good Governance',
  },
  {
    scenario: 'A government official awards contracts to companies owned by their relatives without a bidding process.',
    answer: 'Bad Governance',
  },
  {
    scenario: 'A local council holds open forums to gather feedback from citizens before making major decisions.',
    answer: 'Good Governance',
  },
  {
    scenario: 'A public school principal ignores complaints from parents and teachers about unsafe facilities.',
    answer: 'Bad Governance',
  },
  {
    scenario: 'A government agency provides equal access to services for all citizens, regardless of background.',
    answer: 'Good Governance',
  },
  {
    scenario: 'A city government delays fixing broken streetlights in low-income neighborhoods.',
    answer: 'Bad Governance',
  },
  {
    scenario: 'A mayor consults experts and community leaders before implementing a new health policy.',
    answer: 'Good Governance',
  },
  {
    scenario: 'A government office requires bribes to process business permits.',
    answer: 'Bad Governance',
  },
  {
    scenario: 'A city council makes all meeting minutes and decisions available online for everyone.',
    answer: 'Good Governance',
  },
  {
    scenario: 'A public official uses government funds for personal vacations.',
    answer: 'Bad Governance',
  },
];

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function PrinciplesOfGoodGovernance() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const router = useRouter();

  const handleAnswer = (choice) => {
    const correct = QUESTIONS[current].answer === choice;
    if (correct) setScore((s) => s + 1);
    Animated.timing(position, {
      toValue: { x: choice === 'Good Governance' ? SCREEN_WIDTH : -SCREEN_WIDTH, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      position.setValue({ x: 0, y: 0 });
      if (current + 1 < QUESTIONS.length) {
        setCurrent((c) => c + 1);
      } else {
        router.push({
          pathname: '/QuizScore',
          params: { score: score + (correct ? 1 : 0), total: QUESTIONS.length },
        });
      }
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dx) > 10,
      onPanResponderMove: (_, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > 120) {
          handleAnswer('Good Governance');
        } else if (gesture.dx < -120) {
          handleAnswer('Bad Governance');
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const bgColor = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
    outputRange: ['#ffdddd', '#fff', '#ddffdd'],
    extrapolate: 'clamp',
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {current < QUESTIONS.length && (
          <Animated.View
            {...panResponder.panHandlers}
            style={[styles.card, { backgroundColor: bgColor, transform: [{ translateX: position.x }] }]}
          >
            <Text style={styles.qNumber}>Question {current + 1} of {QUESTIONS.length}</Text>
            <Text style={styles.question}>{QUESTIONS[current].scenario}</Text>
            <View style={styles.choicesRow}>
              <TouchableOpacity style={styles.choiceBtn} onPress={() => handleAnswer('Bad Governance')}>
                <Icon name="x-circle" size={40} color="#ff4444" />
                <Text style={styles.choiceText}>Bad Governance</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.choiceBtn} onPress={() => handleAnswer('Good Governance')}>
                <Icon name="check-circle" size={40} color="#22bb33" />
                <Text style={styles.choiceText}>Good Governance</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </View>
      <TopBanner />
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0038A8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    height: 400,
    borderRadius: 24,
    marginTop: 50,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
    backgroundColor: '#f5f5f5',
  },
  qNumber: {
    fontSize: 18,
    color: '#6c63ff',
    fontWeight: 'bold',
    marginBottom: 18,
  },
  question: {
    fontSize: 20,
    color: '#222',
    textAlign: 'center',
    marginBottom: 36,
    fontWeight: '500',
  },
  choicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  choiceBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  choiceText: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#444',
  },
}); 