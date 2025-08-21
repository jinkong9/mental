import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

// 더미 아바타 이미지 (원하면 실제 경로로 교체)
const userAvatar = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
const botAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712109.png";

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi there! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  // 메시지 전송
  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now().toString(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // 간단한 봇 응답 (추후 axios API 연동 가능)
    setTimeout(() => {
      const botMsg = {
        id: Date.now().toString(),
        text: "This is a chatbot response!",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const renderItem = ({ item }) => {
    const isUser = item.sender === "user";
    return (
      <View
        style={[styles.messageRow, isUser ? styles.userRow : styles.botRow]}
      >
        {!isUser && <Image source={{ uri: botAvatar }} style={styles.avatar} />}
        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.botBubble,
          ]}
        >
          <Text style={isUser ? styles.userText : styles.botText}>
            {item.text}
          </Text>
        </View>
        {isUser && <Image source={{ uri: userAvatar }} style={styles.avatar} />}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS면 padding, Android는 height
      keyboardVerticalOffset={90} // 탭바나 헤더 높이에 맞춰 조정
    >
      <SafeAreaView style={styles.container}>
        {/* 헤더 */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>도움이 필요하신가요 ?</Text>
        </View>

        {/* 메시지 리스트 */}
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
        />

        {/* 입력창 */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Ask me anything..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },

  messagesList: { padding: 10 },

  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 12,
  },
  userRow: { justifyContent: "flex-end" },
  botRow: { justifyContent: "flex-start" },

  avatar: { width: 32, height: 32, borderRadius: 16, marginHorizontal: 6 },

  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: "70%",
  },
  userBubble: {
    backgroundColor: "#0078FF",
    borderTopRightRadius: 0,
  },
  botBubble: {
    backgroundColor: "#F1F1F1",
    borderTopLeftRadius: 0,
  },

  userText: { color: "#fff" },
  botText: { color: "#000" },

  inputRow: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#0078FF",
    borderRadius: 20,
    padding: 10,
  },
  sendText: { color: "#fff", fontSize: 16 },
});
