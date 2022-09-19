<template>
  <div>
    <div class="header">
      <p class="title">app1_index</p>
    </div>

    <van-button type="primary" plain @click="JumpTo" block>跳转到外部应用App2</van-button>
    <van-button type="primary" @click="Login" block>{{ user.token ? '退出登录' : '登录' }}</van-button>
  </div>
</template>

<script setup lang="ts">
import { ComponentInternalInstance } from 'vue'
import { userStore } from '../../../store/index'
const user = userStore()
const router = useRouter()
const { proxy } = getCurrentInstance() as ComponentInternalInstance
const JumpTo = () => {
  // router.push({ name: 'home' })
  window.location.href = window.location.origin + '/app2'
}
const Login = () => {
  if (user.token) {
    proxy?.$toast.success('已退出登录')
    user.token = ''
  } else {
    router.push({ name: 'Login' })
  }
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
    @include no-wrap();
  }
}

.van-button {
  margin: 0 auto;
  width: 300px;
  margin-top: 20px;
}
</style>
