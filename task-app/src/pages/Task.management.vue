<template>
  <div class="container">
    <h1>📖 タスク管理手帳</h1>

    <!-- ダッシュボード -->
    <div class="dashboard">
      <p>総タスク数：{{ totalTasks }}</p>
      <p>完了数：{{ completedTasks }}</p>
      <p>未完了数：{{ incompleteTasks }}</p>
      <p>完了率：{{ completionRate }}%</p>

      <hr />

      <p>🔴高：{{ highPriorityTasks }}件</p>
      <p>🟡中：{{ mediumPriorityTasks }}件</p>
      <p>🔵低：{{ lowPriorityTasks }}件</p>

      <p>⚠️期限切れ：{{ overdueTasks }}件</p>
    </div>

  <!-- 入力エリア -->
    <div class="input-area">
      <input v-model="task" placeholder="タスクを入力" />

      <select v-model="priority">
        <option value="高">🔴高</option>
        <option value="中">🟡中</option>
        <option value="低">🔵低</option>
      </select>

      <input type="date" v-model="deadline" />

      <button @click="addTask">追加</button>
    </div>

    <!-- タスクリスト -->
    <ul>
      <li v-for="(item, index) in tasks" :key="index">

        <div class="task-top">
          <input type="checkbox" v-model="item.done" />

          <span :class="{ done: item.done }">
            {{ item.name }}
          </span>
        </div>

        <div class="task-meta">
          <span
            :class="{
              high: item.priority === '高',
              medium: item.priority === '中',
              low: item.priority === '低'
            }"
          >
            {{ item.priority }}
          </span>

          <span>期限：{{ item.deadline || '未設定' }}</span>
        </div>

        <div class="actions">
          <button @click="deleteTask(index)">削除</button>
        </div>

      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const task = ref('')
const priority = ref('中')
const deadline = ref('')

const saved = localStorage.getItem('tasks')

const tasks = ref(saved ? JSON.parse(saved) : [])

/* 追加 */
const addTask = () => {
  if (!task.value) return

  tasks.value.push({
    name: task.value,
    done: false,
    priority: priority.value,
    deadline: deadline.value
  })

  task.value = ''
  priority.value = '中'
  deadline.value = ''
}

/* 削除 */
const deleteTask = (index) => {
  tasks.value.splice(index, 1)
}

/* 保存 */
watch(tasks, (newTasks) => {
  localStorage.setItem('tasks', JSON.stringify(newTasks))
}, { deep: true })

/* ===== 集計 ===== */
const totalTasks = computed(() => tasks.value.length)

const completedTasks = computed(() =>
  tasks.value.filter(t => t.done).length
)

const incompleteTasks = computed(() =>
  tasks.value.filter(t => !t.done).length
)

const completionRate = computed(() => {
  if (totalTasks.value === 0) return 0
  return Math.round((completedTasks.value / totalTasks.value) * 100)
})

const highPriorityTasks = computed(() =>
  tasks.value.filter(t => t.priority === '高').length
)

const mediumPriorityTasks = computed(() =>
  tasks.value.filter(t => t.priority === '中').length
)

const lowPriorityTasks = computed(() =>
  tasks.value.filter(t => t.priority === '低').length
)

const overdueTasks = computed(() => {
  const today = new Date().toISOString().split('T')[0]

  return tasks.value.filter(t =>
    !t.done &&
    t.deadline &&
    t.deadline < today
  ).length
})
</script>

<style>
body {
  margin: 0;
  background: #f2eadf;
  font-family: "Hiragino Sans", sans-serif;
}

.container {
  max-width: 900px;
  margin: auto;
  padding: 30px;
}

h1 {
  text-align: center;
  color: #5c4632;
}

.dashboard {
  background: #fffaf0;
  border: 2px solid #d4c4a8;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.input-area {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

input,
select,
button {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #cdbb9f;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #fffaf0;
  border-left: 5px solid #ff9a9a;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
}

.task-top {
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-meta {
  font-size: 13px;
  color: #666;
  margin-top: 5px;
  display: flex;
  gap: 10px;
}

.done {
  text-decoration: line-through;
  color: #888;
}

.high {
  color: #d62828;
  font-weight: bold;
}

.medium {
  color: #f77f00;
  font-weight: bold;
}

.low {
  color: #3a86ff;
  font-weight: bold;
}

.actions {
  margin-top: 8px;
}
</style>