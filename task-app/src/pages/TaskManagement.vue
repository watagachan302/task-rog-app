<template>
  <div class="notebook">

    <router-link to="/dashboard" class="back-btn">
      ← メニューへ戻る
    </router-link>

    <h1>📖 日報</h1>

    <p class="date">{{ today }}</p>

    <section>
      <h2>今日やったこと</h2>
      <textarea
        v-model="workLog"
        placeholder="今日やったことを書いてください"
      ></textarea>
    </section>

    <section>
      <h2>困ったこと</h2>
      <textarea
        v-model="problem"
        placeholder="困ったことを書いてください"
      ></textarea>
    </section>

    <section>
      <h2>改善案</h2>
      <textarea
        v-model="improvement"
        placeholder="改善案を書いてください"
      ></textarea>

      <button @click="createTask">
        📋 改善案をタスク化
      </button>
    </section>

  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const today = new Date().toLocaleDateString("ja-JP");

const workLog = ref(
  localStorage.getItem("workLog") || ""
);

const problem = ref(
  localStorage.getItem("problem") || ""
);

const improvement = ref(
  localStorage.getItem("improvement") || ""
);

watch(workLog, (value) => {
  localStorage.setItem("workLog", value);
});

watch(problem, (value) => {
  localStorage.setItem("problem", value);
});

watch(improvement, (value) => {
  localStorage.setItem("improvement", value);
});

const createTask = () => {
  if (!improvement.value.trim()) {
    alert("改善案を入力してください");
    return;
  }

  const tasks = JSON.parse(
    localStorage.getItem("tasks") || "[]"
  );

  tasks.push({
    name: improvement.value,
    done: false,
    priority: "中",
    deadline: "",
  });

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  alert("タスク管理へ追加しました");

  improvement.value = "";
};
</script>

<style scoped>
.notebook {
  min-height: 100vh;

  padding: 40px 100px;

  background:
    repeating-linear-gradient(
      to bottom,
      #fffef8,
      #fffef8 34px,
      #cfe0ff 35px
    );

  position: relative;
}

.notebook::before {
  content: "";

  position: fixed;

  left: 70px;
  top: 0;

  width: 3px;
  height: 100vh;

  background: #ff8a8a;
}

.back-btn {
  text-decoration: none;
  color: #444;
  font-weight: bold;
}

h1 {
  text-align: center;
  color: #5c4632;
}

.date {
  text-align: right;
  margin-bottom: 30px;
}

section {
  margin-bottom: 40px;
}

h2 {
  color: #5c4632;
}

textarea {
  width: 100%;
  min-height: 120px;

  border: none;
  background: transparent;

  resize: vertical;

  font-size: 16px;
  line-height: 35px;

  outline: none;
}

button {
  margin-top: 15px;

  padding: 10px 20px;

  border: none;

  border-radius: 8px;

  cursor: pointer;

  background: #8d6e63;
  color: white;
}
</style>