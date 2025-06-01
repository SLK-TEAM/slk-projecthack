import { StyleSheet, Text, View, Image } from "react-native";
import { useRouter } from 'expo-router';

import Logo from "../assets/adaptive-icon.png";
import { useRef, useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const carouselImages = [
  {
    uri: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    caption: "Organize your contacts easily",
  },
  {
    uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    caption: "Send group messages in seconds",
  },
  {
    uri: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    caption: "Stay connected effortlessly",
  },
];
const Menu = () => {
  const scrollRef = useRef(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (carouselIndex + 1) % carouselImages.length;
      setCarouselIndex(nextIndex);
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselIndex]);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.img} />

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}
        style={styles.carousel}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / width);
          setCarouselIndex(idx);
        }}
      >
        {carouselImages.map((item, idx) => (
          <View key={idx} style={styles.carouselItem}>
            <Image source={{ uri: item.uri }} style={styles.carouselImage} />
            <Text style={styles.carouselCaption}>{item.caption}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.dots}>
        {carouselImages.map((_, idx) => (
          <View
            key={idx}
            style={[styles.dot, carouselIndex === idx && styles.activeDot]}
          />
        ))}
      </View>

      <Text style={styles.title}>Welcome to Texting List App</Text>
      <Text
        style={{
          marginTop: 10,
          marginBottom: 30,
          fontSize: 16,
          color: "#555",
        }}
      >
        Choose an option to get started
      </Text>

      <TouchableOpacity style={styles.menuCard}>
        <Image
          source={{
            uri: "https://img.icons8.com/ios-filled/50/000000/add-user-group-man-man.png",
          }}
          style={styles.menuIcon}
        />
        <Text style={styles.menuText}>Create New List</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuCard}>
        <Image
          source={{
            uri: "https://img.icons8.com/ios-filled/50/000000/opened-folder.png",
          }}
          style={styles.menuIcon}
        />
        <Text style={styles.menuText}>View My Lists</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuCard}>
        <Image
          source={{
            uri: "https://img.icons8.com/ios-filled/50/000000/settings.png",
          }}
          style={styles.menuIcon}
        />
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.menuCard}
        onPress={() => router.push('/chat')}
      >
        <Image
          source={{
            uri: "https://img.icons8.com/ios-filled/50/000000/chat-bubble.png",
          }}
          style={styles.menuIcon}
        />
        <Text style={styles.menuText}>Chat with AI</Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton}>
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/ffffff/login-rounded-right.png",
            }}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#6c63ff" }]}
        >
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/ffffff/settings.png",
            }}
            style={styles.actionIcon}
          />
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f6f8fc",
    paddingTop: 40,
  },
  img: {
    marginVertical: 10,
    width: 80,
    height: 80,
    resizeMode: "contain",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#6c63ff",
    backgroundColor: "#fff",
    shadowColor: "#6c63ff",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  carousel: {
    width: "100%",
    maxHeight: 210,
    marginBottom: 10,
  },
  carouselItem: {
    width: width,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  carouselImage: {
    width: width * 0.85,
    height: 130,
    borderRadius: 18,
    marginBottom: 10,
    resizeMode: "cover",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  carouselCaption: {
    fontSize: 16,
    color: "#444",
    fontWeight: "500",
    textAlign: "center",
    backgroundColor: "#fff8",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#bbb",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#6c63ff",
    width: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#222",
    textShadowColor: "#e0e0ff",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  menuCard: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    padding: 18,
    backgroundColor: "#e6f0fa",
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#6c63ff",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  menuIcon: {
    width: 32,
    height: 32,
    marginRight: 18,
  },
  menuText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginTop: 30,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00b894",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
    marginHorizontal: 8,
    shadowColor: "#00b894",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  actionIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
    tintColor: "#fff",
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
