<template>
  <div class="login-page">
    <div class="login-card">
      <h1>📒 業務改善アプリ</h1>
      <p>業務を整理して効率化しよう</p>

      <input
        v-model="userId"
        type="text"
        placeholder="ユーザーID"
      />

      <input
        v-model="password"
        type="password"
        placeholder="パスワード"
      />

      <button @click="login">
        ログイン
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userId = ref("");
const password = ref("");

const login = () => {
  if (!userId.value || !password.value) {
    alert("IDとパスワードを入力してください");
    return;
  }

  router.push("/dashboard");
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: #f2eadf;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 350px;
  background: #fffaf0;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
  text-align: center;
}

h1 {
  color: #5c4632;
  margin-bottom: 10px;
}

p {
  color: #666;
  margin-bottom: 25px;
}

input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #d4c4a8;
  border-radius: 6px;
}

button {
  width: 100%;
  padding: 12px;
  border: none;
  background: #8d6e63;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}
</style>