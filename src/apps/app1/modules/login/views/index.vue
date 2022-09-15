<template>
  <div>
    <div class="header">
      <p class="title">app1_login</p>
    </div>

    <div class="main-content">
      <van-form @submit="formSubmit">
        <van-cell-group inset>
          <van-field v-model="userLogin.username" name="username" label="用户名" placeholder="请输入用户名" :rules="[{ required: true, message: '请输入用户名' }]"></van-field>
          <van-field type="password" v-model="userLogin.password" name="password" label="密码" placeholder="请输入密码" :rules="[{ required: true, message: '请输入密码' }]"></van-field>
        </van-cell-group>
        <van-button style="margin-top: 20px" round block type="primary" native-type="submit">提交</van-button>
      </van-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ComponentInternalInstance } from 'vue'
import { randomString } from '@/base/utils/tool'
import { userStore } from '../../../store/index'

const router = useRouter()
/**
 * 如果不加上断言会报proxy属性不存在，因为getCurrentInstance() 可能为 null
 * 这里的proxy可以看做是vue2中的vue实例的this
 */
const { proxy } = getCurrentInstance() as ComponentInternalInstance

const userLogin = reactive({
  username: '',
  password: ''
})

const user = userStore()
const formSubmit = () => {
  proxy?.$toast.success('登录成功')
  // router.go(-1)
  router.push({ name: 'App1' })
  const token = randomString()
  user.setToken(token)
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

.main-content {
  padding: 20px;
  :deep(.van-cell-group--inset) {
    margin: 0;
  }
}
</style>
