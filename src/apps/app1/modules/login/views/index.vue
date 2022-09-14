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
const userLogin = reactive({
  username: '',
  password: ''
})
const formSubmit = (val: any) => {
  console.log(val, 'formSubmit')
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
