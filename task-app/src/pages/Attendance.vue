<template>
  <div class="container">
    <h1>⏰ 勤怠管理</h1>

    <div class="card">
      <h2>今日の勤怠</h2>

      <p>出勤時刻：{{ startTime || "未記録" }}</p>
      <p>退勤時刻：{{ endTime || "未記録" }}</p>

      <button @click="clockIn">
        出勤
      </button>

      <button @click="clockOut">
        退勤
      </button>
    </div>

    <div class="card">
      <h2>勤務時間</h2>
      <p>{{ workHours }}</p>
    </div>

    <div class="card">
      <h2>勤務履歴</h2>

      <div
        v-for="(item, index) in history"
        :key="index"
        class="history-item"
      >
        <p>{{ item.date }}</p>

        <div class="edit-row">
          <input
            type="time"
            v-model="item.start"
          />

          <span>～</span>

          <input
            type="time"
            v-model="item.end"
          />

          <button
            @click="saveHistory"
          >
            保存
          </button>

          <button
            @click="deleteHistory(index)"
          >
            削除
          </button>
        </div>

        <p>
          勤務時間：
          {{ calculateHours(item.start, item.end) }}
        </p>

        <hr />
      </div>
    </div>

    <router-link
      to="/dashboard"
      class="back-link"
    >
      ← メニューへ戻る
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const startTime = ref(
  localStorage.getItem("startTime") || ""
);

const endTime = ref(
  localStorage.getItem("endTime") || ""
);

const history = ref(
  JSON.parse(
    localStorage.getItem("attendanceHistory") || "[]"
  )
);

const clockIn = () => {
  const now = new Date();

  const time =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0");

  startTime.value = time;

  localStorage.setItem(
    "startTime",
    time
  );
};

const clockOut = () => {
  const now = new Date();

  const time =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0");

  endTime.value = time;

  localStorage.setItem(
    "endTime",
    time
  );

  const today = new Date().toLocaleDateString("ja-JP");

  history.value.unshift({
    date: today,
    start: startTime.value,
    end: time,
  });

  localStorage.setItem(
    "attendanceHistory",
    JSON.stringify(history.value)
  );
};

const saveHistory = () => {
  localStorage.setItem(
    "attendanceHistory",
    JSON.stringify(history.value)
  );

  alert("保存しました");
};

const deleteHistory = (index) => {
  const result = confirm(
    "この履歴を削除しますか？"
  );

  if (!result) return;

  history.value.splice(index, 1);

  localStorage.setItem(
    "attendanceHistory",
    JSON.stringify(history.value)
  );
};

const calculateHours = (
  start,
  end
) => {
  if (!start || !end) {
    return "未計算";
  }

  const startMin =
    Number(start.split(":")[0]) * 60 +
    Number(start.split(":")[1]);

  const endMin =
    Number(end.split(":")[0]) * 60 +
    Number(end.split(":")[1]);

  const diff = endMin - startMin;

  const hours = Math.floor(
    diff / 60
  );

  const minutes = diff % 60;

  return `${hours}時間${minutes}分`;
};

const workHours = computed(() => {
  return calculateHours(
    startTime.value,
    endTime.value
  );
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
  margin-bottom: 20px;
  border-radius: 10px;
}

button {
  padding: 8px 15px;
  margin-right: 10px;
}

.edit-row {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.history-item {
  margin-bottom: 15px;
}

.back-link {
  text-decoration: none;
  font-weight: bold;
}
</style>