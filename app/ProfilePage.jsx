import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Pressable } from 'react-native';
import BottomNavbar from './BottomNavbar';
import TopBanner from './TopBanner';
import { useRouter } from 'expo-router';
import Verified from '../assets/verified.png';
import LoadingScreen from './LoadingScreen';

const USER = {
  name: 'Juan Dela Cruz',
  email: 'juan.delacruz@email.com',
  image: 'https://randomuser.me/api/portraits/men/32.jpg',
};

export default function ProfilePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    setShowSignOutModal(false);
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      router.replace('/');
    }, 1000);
  };

  if (showLoading) {
    return <LoadingScreen message="Signing you out..." onFinish={() => router.replace('/')} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Profile Card */}
        <TouchableOpacity style={styles.profileCard} onPress={() => setModalVisible(true)} activeOpacity={0.85}>
          <Image source={{ uri: USER.image }} style={styles.profileImage} />
          <Text style={styles.profileName}>{USER.name}</Text>
          <Text style={styles.profileEmail}>{USER.email}</Text>
        </TouchableOpacity>
        {/* Progress Section */}
        <View style={styles.progressSection}>
          <Text style={styles.progressTitle}>Progress</Text>
          <View style={styles.progressCounters}>
            <View style={styles.counterBox}>
              <Text style={styles.counterLabel}>Topics Done</Text>
              <Text style={styles.counterValue}>0/5</Text>
            </View>
            <View style={styles.counterBox}>
              <Text style={styles.counterLabel}>Quizzes Done</Text>
              <Text style={styles.counterValue}>0/5</Text>
            </View>
          </View>
        </View>
        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={() => setShowSignOutModal(true)}> 
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      {/* Modal for ID Card */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.idCardModalBox}>
            <Image source={{ uri: USER.image }} style={styles.idImage} />
            <Text style={styles.idName}>{USER.name}</Text>
            <Text style={styles.idEmail}>{USER.email}</Text>
            <View style={styles.stampBox}>
              <Text style={styles.stampText}>GoverNice User</Text>
              <Image source={Verified} style={styles.stampIcon} />
            </View>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={{ color: '#000', fontWeight: 'bold' }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Sign Out Confirmation Modal */}
      <Modal
        visible={showSignOutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSignOutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.signOutModalBox}> 
            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#0038A8', marginBottom: 18 }}>Are you sure you want to sign out?</Text>
            <Pressable style={[styles.closeButton, { backgroundColor: 'gray', marginBottom: 8 }]} onPress={handleSignOut}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Logout</Text>
            </Pressable>
            <Pressable style={styles.closeButton} onPress={() => setShowSignOutModal(false)}>
              <Text style={{ color: '#000', fontWeight: 'bold' }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <TopBanner />
      <BottomNavbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#0038A8',
    paddingTop: 200,
    paddingHorizontal: 18,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    padding: 24,
    marginBottom: 28,
    elevation: 3,
    width: '100%',
    maxWidth: 340,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    borderWidth: 5,
    borderColor: '#0038A8',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0038A8',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 15,
    color: '#0038A8',
    marginBottom: 2,
  },
  progressSection: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    width: '100%',
    maxWidth: 340,
    marginBottom: 28,
    elevation: 2,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0038A8',
    marginBottom: 12,
  },
  progressCounters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  counterBox: {
    alignItems: 'center',
    flex: 1,
  },
  counterLabel: {
    fontSize: 15,
    color: '#0038A8',
    marginBottom: 4,
  },
  counterValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0038A8',
  },
  signOutButton: {
    backgroundColor: '#ff4444',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 18,
    elevation: 2,
  },
  signOutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  idCardModalBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    padding: 28,
    width: 300,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#0038A8',
  },
  idImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#6c63ff',
  },
  idName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  idEmail: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  stampBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#91aadb',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  stampText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginRight: 8,
  },
  stampIcon: {
    width: 32,
    height: 32,
  },
  closeButton: {
    backgroundColor: '#FCD116',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 8,
  },
  signOutModalBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    alignItems: 'center',
    padding: 28,
    width: 300,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#ff4444',
  },
}); 