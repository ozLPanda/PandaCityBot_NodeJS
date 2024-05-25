import { defineStore } from 'pinia'
import { onMounted, ref, watch } from 'vue'

export const useUserStore = defineStore('user', () => {
  let token = ref(null)

  onMounted(() => {
    let _token = localStorage.getItem('token')
    if (_token != null) {
      token.value = _token
    }
  })

  function clearToken(){
    localStorage.removeItem('token')
    token.value = null
  }

  function setToken(_token){
    token.value = _token
    localStorage.setItem('token', token.value)
  }

  return {
    token,
    clearToken,
    setToken
  }
})
