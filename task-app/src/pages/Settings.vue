<template>
  <div class="settings-page">

    <h1>⚙ 設定</h1>

    <div class="card">

      <h2>文字サイズ</h2>

      <select v-model="fontSize">
        <option>小</option>
        <option>中</option>
        <option>大</option>
      </select>

    </div>

    <div class="card">

      <h2>フォント</h2>

      <select v-model="fontFamily">
        <option>ゴシック</option>
        <option>明朝</option>
      </select>

    </div>

    <div class="card">

      <h2>テーマ</h2>

      <select v-model="theme">
        <option>ノート</option>
        <option>ダーク</option>
      </select>

    </div>

    <router-link to="/dashboard" class="back-btn">
      ← メニューへ戻る
    </router-link>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const fontSize = ref('中')
const fontFamily = ref('ゴシック')
const theme = ref('ノート')
</script>

<style scoped>
.settings-page {
  min-height: 100vh;
  background: #f2eadf;
  padding: 30px;
}

h1 {
  text-align: center;
  color: #5c4632;
}

.card {
  background: #fffaf0;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.back-btn {
  display: inline-block;
  margin-top: 20px;
  text-decoration: none;
  color: #5c4632;
  font-weight: bold;
}
</style>