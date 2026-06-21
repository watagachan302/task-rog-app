<template>
  <div class="container">
    <h1>📋 タスク管理</h1>

    <div class="input-area">
      <input
        v-model="task"
        placeholder="タスクを入力"
      />

      <select v-model="priority">
        <option value="高">🔴高</option>
        <option value="中">🟡中</option>
        <option value="低">🔵低</option>
      </select>

      <input
        type="date"
        v-model="deadline"
      />

      <button @click="addTask">
        追加
      </button>
    </div>

    <ul>
      <li
        v-for="(item, index) in tasks"
        :key="index"
      >
        <div class="task-top">
          <input
            type="checkbox"
            v-model="item.done"
          />

          <span :class="{ done: item.done }">
            {{ item.name }}
          </span>
        </div>

        <div class="task-meta">
          <span>{{ item.priority }}</span>
          <span>
            期限：
            {{ item.deadline || "未設定" }}
          </span>
        </div>

        <button @click="deleteTask(index)">
          削除
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const task = ref("");
const priority = ref("中");
const deadline = ref("");

const saved = localStorage.getItem("tasks");

const tasks = ref(
  saved ? JSON.parse(saved) : []
);

const addTask = () => {
  if (!task.value) return;

  tasks.value.push({
    name: task.value,
    done: false,
    priority: priority.value,
    deadline: deadline.value,
  });

  task.value = "";
  priority.value = "中";
  deadline.value = "";
};

const deleteTask = (index) => {
  tasks.value.splice(index, 1);
};

watch(
  tasks,
  (newTasks) => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(newTasks)
    );
  },
  { deep: true }
);
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 30px;
}

.input-area {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input,
select,
button {
  padding: 8px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  margin-bottom: 10px;
  background: #fffaf0;
  border-radius: 8px;
}

.task-top {
  display: flex;
  gap: 10px;
}

.task-meta {
  margin-top: 5px;
  font-size: 14px;
  color: gray;
}

.done {
  text-decoration: line-through;
}
</style>