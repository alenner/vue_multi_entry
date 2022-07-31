<template>
  <div>
    <div class="header">
      <p class="title">首页</p>
    </div>

    <div class="button" @click="JumpTo">跳转到page1</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const JumpTo = () => {
  // router.push({ name: 'page1' }) // 无法跳转到其他入口页面
  window.location.href = window.location.origin + '/page1.html'
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    font-size: 16px;
    font-weight: bold;
    color: red;
  }
}

.button {
  border-radius: 3px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: blue;
  color: #FFF;
  font-size: 12px;
}
</style>