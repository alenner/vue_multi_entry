<template>
  <div>
    <div class="header">
      <p class="title">App2</p>
    </div>

    <van-button type="primary" plain @click="JumpTo" block>跳转到外部应用App1</van-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const JumpTo = () => {
  // router.push({ name: 'home' })
  window.location.href = window.location.origin + '/app1'
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

.van-button {
  margin: 0 auto;
  width: 300px;
  margin-top: 20px;
}
</style>
