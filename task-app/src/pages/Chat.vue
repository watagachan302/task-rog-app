<template>
  <div class="container">
    <h1>💬 社内チャット</h1>

    <div class="chat-box">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message"
      >
        {{ message }}
      </div>
    </div>

    <div class="input-area">
      <input
        v-model="newMessage"
        placeholder="メッセージを入力"
      />

      <button @click="sendMessage">
        送信
      </button>
    </div>

    <router-link to="/dashboard">
      ← メニューへ戻る
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";

const messages = ref(
  JSON.parse(
    localStorage.getItem("chatMessages") || "[]"
  )
);

const newMessage = ref("");

const sendMessage = () => {
  if (!newMessage.value) return;

  messages.value.push(newMessage.value);

  localStorage.setItem(
    "chatMessages",
    JSON.stringify(messages.value)
  );

  newMessage.value = "";
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 30px;
}

.chat-box {
  background: white;
  height: 400px;
  overflow-y: auto;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.message {
  background: #f5f5f5;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
}

.input-area {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 10px;
}

button {
  padding: 10px 20px;
}
</style>