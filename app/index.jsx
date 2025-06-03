import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Logo from '../assets/pnglogo.png';
import LoadingScreen from './LoadingScreen';

export default function SplashPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [inputHint, setInputHint] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    setUsernameError('');
    setPasswordError('');
    setInputHint('');
    let hasError = false;
    if (!username || !password) {
      setInputHint('Please type your username and password.');
      hasError = true;
    } else {
      if (username !== 'juanDcruz') {
        setUsernameError("Your username doesn't exist");
        hasError = true;
      }
      if (username === 'juanDcruz' && password !== '1delax@') {
        setPasswordError('You typed a wrong password.');
        hasError = true;
      }
    }
    if (!hasError) {
      setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
        router.push('/HomePage');
      }, 1000);
    }
  };

  if (showLoading) {
    return <LoadingScreen message="Welcome to Gover-Nice!" onFinish={() => router.push('/HomePage')} />;
  }

  return (
    <View style={styles.container}>
      {/* Question Mark Button */}
      <View style={styles.topRight}>
        <TouchableOpacity onPress={() => router.push('/About')} style={styles.questionButton}>
          <Text style={styles.questionMark}>?</Text>
        </TouchableOpacity>
      </View>
      {/* Logo and Title */}
      <Image source={Logo} style={styles.logo} />
      {/* Login Form */}
      <View style={styles.form}>
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          style={[styles.input, usernameError ? styles.inputError : null]}
          placeholder="Type your username"
          value={username}
          onChangeText={text => { setUsername(text); setUsernameError(''); setInputHint(''); }}
          autoCapitalize="none"
        />
        {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={[styles.input, passwordError ? styles.inputError : null]}
          placeholder="Type your password"
          value={password}
          onChangeText={text => { setPassword(text); setPasswordError(''); setInputHint(''); }}
          secureTextEntry
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        {inputHint ? <Text style={styles.hintText}>{inputHint}</Text> : null}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createAccountButton} onPress={() => router.push('/CreateAccount')}>
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    width: 300,
    height: 300,
    marginBottom: 16,
    resizeMode: 'contain',
    marginBottom: 100,
  },
  form: {
    width: '80%',
    alignItems: 'center',
    top: -150,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#ff4444',
    borderWidth: 2,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 2,
    marginLeft: 2,
  },
  hintText: {
    color: '#FCD116',
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 6,
    marginLeft: 2,
  },
  loginButton: {
    width: '50%',
    backgroundColor: '#FCD116',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createAccountButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  createAccountText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
