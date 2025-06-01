import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
import BottomNavbar from './BottomNavbar';

const GEMINI_API_KEY = 'AIzaSyA5jWOa-JeoyGVPUGvpIb_aSRoDqmq8iUU';

console.log('Loaded Gemini API Key:', GEMINI_API_KEY);

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
  const scrollViewRef = useRef<ScrollViewType>(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  

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
            parts: [{ text: inputText.trim() }],
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
    <View style={{flex: 1}}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
            <Surface
              key={index}
              style={[
                styles.messageBubble,
                message.isUser ? styles.userMessage : styles.botMessage,
              ]}
              elevation={1}
            >
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.timestamp}>
                {message.timestamp.toLocaleTimeString()}
              </Text>
            </Surface>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <PaperTextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            multiline
            disabled={isLoading}
          />
          <Button
            mode="contained"
            onPress={handleSend}
            disabled={isLoading || !inputText.trim()}
            loading={isLoading}
            style={styles.sendButton}
          >
            Send
          </Button>
        </View>
      </KeyboardAvoidingView>
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 16,
    color: '#000000',
  },
  timestamp: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 80,
  },
  input: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
  },
  sendButton: {
    justifyContent: 'center',
  },
});
