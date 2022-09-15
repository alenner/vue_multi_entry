import { defineStore } from 'pinia'
import { User } from './types'

export const userStore = defineStore('user', {
  state: (): User => {
    return {
      token: window.localStorage.getItem('token') || ''
    }
  },
  getters: {},
  actions: {
    // 将获取到的token行进数据持久化存储
    setToken(token: string): void {
      this.token = token
      window.localStorage.setItem('token', token)
    },
    // 清空localstorage持久化数据token
    clearToken(): void {
      this.token = ''
      window.localStorage.removeItem('token')
    }
  }
})
