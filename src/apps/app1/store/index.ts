import { defineStore } from 'pinia'
import { User } from './types'

export const userStore = defineStore('user', {
  state: (): User => {
    return {
      token: ''
    }
  },
  getters: {},
  actions: {
    // 在action中做数据的持久化存储
    //   // 将获取到的token行进数据持久化存储
    //   setToken(token: string): void {
    //     this.token = token
    //     window.localStorage.setItem('token', token)
    //   },
    //   // 清空localstorage持久化数据token
    //   clearToken(): void {
    //     this.token = ''
    //     window.localStorage.removeItem('token')
    //   }
  },
  // 所有数据持久化
  // persist: true
  // 持久化存储插件其他配置
  persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: 'user',
    // 默认为 localStorage
    storage: window.localStorage,
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    paths: ['token']
  }
})
