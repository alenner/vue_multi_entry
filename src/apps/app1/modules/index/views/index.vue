<template>
  <div>
    <div class="header">
      <p class="title">app1_index</p>
    </div>

    <div class="button" @click="JumpTo">跳转到外部应用App2</div>
    <div class="button" @click="Login">登录</div>
  </div>
  
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const JumpTo = () => {
  // router.push({ name: 'home' })
  window.location.href = window.location.origin + '/app2'
}
const Login = () => {
  router.push({ name: 'Login' })
}
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  background-color: $color-primary;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
  }
}

.button {
  margin-top: 20px;
  border-radius: 3px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $color-primary;
  color: $color-text-regular;
  font-size: 12px;

  &:hover {
    cursor: pointer;
  }
}
</style>