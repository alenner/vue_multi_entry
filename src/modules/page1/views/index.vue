<template>
  <div>
    <div class="header">
      <p class="title">page1</p>
    </div>

    <div class="button" @click="JumpTo">跳转到首页</div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

console.log(process.env, 'console.log(process.env) ')
const JumpTo = () => {
  // router.push({ name: 'home' })
  window.location.href = window.location.origin
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

  &:hover {
    cursor: pointer;
  }
}
</style>