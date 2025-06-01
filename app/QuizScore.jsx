import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import BottomNavbar from './BottomNavbar';

export default function QuizScore() {
  const router = useRouter();
  const { score = 0, total = 0 } = useLocalSearchParams();
  const numericScore = parseInt(score, 10);
  const numericTotal = parseInt(total, 10);
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Complete!</Text>
        <Text style={styles.scoreText}>You got {numericScore} out of {numericTotal} correct.</Text>
        <Text style={styles.message}>{numericScore >= 7 ? 'Great job! You know your governance.' : 'Keep learning and try again!'}</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/HomePage')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6c63ff',
    marginBottom: 18,
  },
  scoreText: {
    fontSize: 20,
    color: '#222',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#444',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#6c63ff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 