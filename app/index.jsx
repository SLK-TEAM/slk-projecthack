import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Logo from '../assets/adaptive-icon.png';

export default function SplashPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Question Mark Button */}
      <View style={styles.topRight}>
        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)} style={styles.questionButton}>
          <Text style={styles.questionMark}>?</Text>
        </TouchableOpacity>
        {showDropdown && (
          <View style={styles.dropdown}>
            <Pressable onPress={() => setShowDropdown(false)}><Text style={styles.dropdownItem}>Overview</Text></Pressable>
            <Pressable onPress={() => setShowDropdown(false)}><Text style={styles.dropdownItem}>FAQs</Text></Pressable>
            <Pressable onPress={() => setShowDropdown(false)}><Text style={styles.dropdownItem}>Support Us</Text></Pressable>
          </View>
        )}
      </View>
      {/* Logo and Title */}
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>GoverNice</Text>
      {/* Login Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createAccountButton} onPress={() => router.push('/CreateAccount')}>
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
        {/* Bypass Button */}
        <TouchableOpacity style={styles.bypassButton} onPress={() => router.push('/HomePage')}>
          <Text style={styles.bypassButtonText}>Bypass Here Dev-sama-senpai-kun! &gt;.&lt;</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRight: {
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 10,
    alignItems: 'flex-end',
  },
  questionButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionMark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  dropdown: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    minWidth: 120,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#6c63ff',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6c63ff',
    marginBottom: 32,
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#6c63ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createAccountButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  createAccountText: {
    color: '#6c63ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bypassButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  bypassButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
