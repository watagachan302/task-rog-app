<template>
  <div class="dashboard">

    <h1>📒 業務改善アプリ</h1>

    <div class="menu">

        <router-link to="/settings" class="gear">
      ⚙
    </router-link>

<router-link to="/attendance" class="card">
  ⏰ 勤怠管理
</router-link>

      <router-link to="/tasks" class="card">
        📋 タスク管理
      </router-link>

      <router-link to="/taskmanagement" class="card">
        📖 日報
      </router-link>

      <router-link to="/reports" class="card">
        📊 業務管理
      </router-link>

      <router-link to="/chat" class="card">
  💬 社内チャット
</router-link>

    </div>

  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #f2eadf;
  padding: 30px;
}

.gear {
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 28px;
  text-decoration: none;
}

h1 {
  text-align: center;
  color: #5c4632;
}

.menu {
  max-width: 700px;
  margin: 50px auto;
  display: grid;
  gap: 20px;
}

.card {
  background: #fffaf0;
  padding: 25px;
  border-radius: 12px;
  text-decoration: none;
  color: #333;
  font-size: 20px;
  font-weight: bold;
}
</style>