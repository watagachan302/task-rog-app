<template>
  <div class="container">
    <h1>📊 業務管理</h1>

    <div class="card">
      <p>総タスク数：{{ totalTasks }}</p>
      <p>完了数：{{ completedTasks }}</p>
      <p>未完了数：{{ incompleteTasks }}</p>
      <p>完了率：{{ completionRate }}%</p>
    </div>

    <div class="card">
      <p>🔴 高：{{ highPriorityTasks }}件</p>
      <p>🟡 中：{{ mediumPriorityTasks }}件</p>
      <p>🔵 低：{{ lowPriorityTasks }}件</p>
    </div>

    <div class="card">
      <p>⚠️ 期限切れ：{{ overdueTasks }}件</p>
    </div>

    <router-link to="/dashboard">
      ← メニューへ戻る
    </router-link>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const saved = localStorage.getItem("tasks");

const tasks = ref(
  saved ? JSON.parse(saved) : []
);

const totalTasks = computed(() =>
  tasks.value.length
);

const completedTasks = computed(() =>
  tasks.value.filter(t => t.done).length
);

const incompleteTasks = computed(() =>
  tasks.value.filter(t => !t.done).length
);

const completionRate = computed(() => {
  if (totalTasks.value === 0) return 0;

  return Math.round(
    (completedTasks.value / totalTasks.value) * 100
  );
});

const highPriorityTasks = computed(() =>
  tasks.value.filter(t => t.priority === "高").length
);

const mediumPriorityTasks = computed(() =>
  tasks.value.filter(t => t.priority === "中").length
);

const lowPriorityTasks = computed(() =>
  tasks.value.filter(t => t.priority === "低").length
);

const overdueTasks = computed(() => {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  return tasks.value.filter(
    t =>
      !t.done &&
      t.deadline &&
      t.deadline < today
  ).length;
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 30px;
}

.card {
  background: #fffaf0;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 10px;
}
</style>