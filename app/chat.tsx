import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  TextInput as PaperTextInput,
  Button,
  Text,
  Surface,
} from 'react-native-paper';
import { GoogleGenerativeAI } from '@google/generative-ai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ScrollView as ScrollViewType } from 'react-native';
import { useRouter } from 'expo-router';

const GEMINI_API_KEY = 'AIzaSyA5jWOa-JeoyGVPUGvpIb_aSRoDqmq8iUU';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState([] as Message[]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'tl'>('en');

  const scrollViewRef = useRef<ScrollViewType>(null);
  const router = useRouter();

  useEffect(() => {
    loadChatHistory();
    loadLanguagePreference();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('chatLanguage', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'tl' : 'en'));
  };

  const loadChatHistory = async () => {
    try {
      const savedMessages = await AsyncStorage.getItem('chatHistory');
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages).map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(parsedMessages);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const loadLanguagePreference = async () => {
    try {
      const savedLang = await AsyncStorage.getItem('chatLanguage');
      if (savedLang === 'en' || savedLang === 'tl') {
        setLanguage(savedLang);
      }
    } catch (error) {
      console.error('Error loading language preference:', error);
    }
  };

  const saveChatHistory = async (newMessages: Message[]) => {
    try {
      await AsyncStorage.setItem('chatHistory', JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const result = await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Please respond in ${language === 'en' ? 'English' : 'Tagalog'}: ${inputText.trim()}`,
              },
            ],
          },
        ],
      });

      const response = await result.response;
      const botMessage: Message = {
        text: response.text(),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => {
        const newMessages = [...prev, botMessage];
        saveChatHistory(newMessages);
        return newMessages;
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => {
        const newMessages = [...prev, errorMessage];
        saveChatHistory(newMessages);
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5', }}>
      {/* Banner Header */}
      <View style={styles.banner}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={require('../assets/left-arrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Image source={require('../assets/chat-bot.png')} style={styles.pepitsIcon} />
        <Text style={styles.pepitsText}>Pepits</Text>
        <View style={styles.languageToggleContainer}>
          <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
            <Text style={styles.languageButtonText}>
              Language: {language === 'en' ? 'English' : 'Tagalog'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map((message, index) => (
            message.isUser ? (
              <Surface
                key={index}
                style={[
                  styles.messageBubble,
                  styles.userMessage,
                ]}
                elevation={1}
              >
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={styles.timestamp}>
                  {message.timestamp.toLocaleTimeString()}
                </Text>
              </Surface>
            ) : (
              <View key={index} style={styles.botMsgRow}>
                <Image source={require('../assets/chat-bot.png')} style={styles.pepitsAvatar} />
                <Surface
                  style={[
                    styles.messageBubble,
                    styles.botMessage,
                  ]}
                  elevation={1}
                >
                  <Text style={styles.messageText}>{message.text}</Text>
                  <Text style={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString()}
                  </Text>
                </Surface>
              </View>
            )
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <PaperTextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            multiline
            disabled={isLoading}
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={isLoading || !inputText.trim()}
            style={styles.sendButtonIcon}
          >
            <Image source={require('../assets/paper-plane.png')} style={styles.paperPlaneIcon} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0038A8',
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#0038A8',
    zIndex: 10,
  },
  backButton: {
    marginRight: 10,
    padding: 4,
  },
  backIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  pepitsIcon: {
    width: 24,
    height: 24,
    borderRadius: 18,
    marginRight: 8,
    marginLeft: 10,
    backgroundColor: '#fff',
    resizeMode: 'contain',
  },
  pepitsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  languageToggleContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  languageButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  languageButtonText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 15,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  botMsgRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  pepitsAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 6,
    marginTop: 6,
    backgroundColor: '#fff',
    resizeMode: 'contain',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFF',
    borderColor: '#0038A8',
    borderWidth: 2,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ecf075',
    borderColor: '#0038A8',
    borderWidth: 2,
  },
  pepitsMsgIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    backgroundColor: '#fff',
    resizeMode: 'contain',
  },
  messageText: {
    fontSize: 16,
    color: '#000000',
    flexShrink: 1,
  },
  timestamp: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
    marginLeft: 10,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  sendButtonIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#0038A8',
    borderRadius: 8,
    height: 48,
    width: 48,
  },
  paperPlaneIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
});
