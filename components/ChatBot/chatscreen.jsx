import React, { useState, useRef, useEffect } from "react";
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
  Animated,
} from "react-native";
import axios from "axios";

const userAvatar = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
const botAvatar = "https://cdn-icons-png.flaticon.com/512/4712/4712109.png";

function TypingIndicator() {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animateDot = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 400,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateDot(dot1, 0);
    animateDot(dot2, 200);
    animateDot(dot3, 400);
  }, []);

  return (
    <View style={styles.typingWrapper}>
      <Text style={styles.thinkingText}>잠시만 기다려주세요</Text>
      <View style={styles.typingContainer}>
        <Animated.View style={[styles.dot, { opacity: dot1 }]} />
        <Animated.View style={[styles.dot, { opacity: dot2 }]} />
        <Animated.View style={[styles.dot, { opacity: dot3 }]} />
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: "1", text: "무엇을 도와 드릴까요 ?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const api = axios.create({
    baseURL: "http://54.180.248.91:8080",
  });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now().toString(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    const userQuestion = input;
    setInput("");

    const thinkingId = Date.now().toString() + "_thinking";
    const thinkingMsg = {
      id: thinkingId,
      text: "",
      sender: "bot",
      thinking: true,
    };
    setMessages((prev) => [...prev, thinkingMsg]);

    try {
      const res = await api.post("/api/chatbot", { question: userQuestion });

      const botResponseText = res.data;
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === thinkingId
            ? {
                id: Date.now().toString(),
                text: botResponseText,
                sender: "bot",
              }
            : msg
        )
      );
      console.log(res);
    } catch (err) {
      console.log("API 호출 실패:", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === thinkingId
            ? {
                id: Date.now().toString(),
                text: "봇 응답을 가져오는 데 실패했습니다. 다시 시도해 주세요.",
                sender: "bot",
              }
            : msg
        )
      );
    }
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
          {item.thinking ? (
            <TypingIndicator />
          ) : (
            <Text style={isUser ? styles.userText : styles.botText}>
              {item.text}
            </Text>
          )}
        </View>
        {isUser && <Image source={{ uri: userAvatar }} style={styles.avatar} />}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>도움이 필요하신가요 ?</Text>
        </View>

        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          ref={(ref) => (this.flatList = ref)}
          onContentSizeChange={() =>
            this.flatList.scrollToEnd({ animated: true })
          }
        />

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="궁금하신 내용을 입력해주세요."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
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

  typingWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  thinkingText: {
    fontSize: 12,
    color: "#555",
    marginRight: 6,
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#555",
    marginHorizontal: 2,
  },
});
