<script setup>
import UIInput from '@/components/UI/UIInput.vue'
import FormControl from '@/components/UI/FormControl.vue'
import Button from 'primevue/button'
import { onMounted, reactive, ref } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import { api } from '@/composables/api.js'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useUserStore } from '@/stores/user.js'

const router = useRouter()
const inputSize = ref('350px')
const toast = useToast()
const { setToken } = useUserStore()

let loading = ref(false)
let data = reactive({
  login: null,
  password: null
})
let listError = reactive([])

function onAuth() {
  loading.value = true
  listError = []
  api
    .post('/admin.loginUser', data)
    .then((res) => {
      let data = res.data
      if (data.status === 200) {
        if (data.data.token == null) {
          toast.add({ severity: 'error', summary: 'Ошибка получения ответа от сервера' })
          return
        }
        setToken(data.data.token)
        router.push({ name: 'home' })
      }
    })
    .catch((res) => {
      try {
        listError = [...res.response.data?.error]
      } catch (ex) {
        console.error(ex)
        listError = []
      }
    })
    .finally(() => {
      toast.add({ severity: 'info', summary: 'Ответ получен' })
      loading.value = false
    })
}

onMounted(async () => {
  toast.add({ severity: 'info', summary: 'Ответ получен' })
  // await api.get('/admin/check').then(({ data }) => {
  //   console.log(data)
  // })
})
</script>

<template>
  <div class="bg__container">
    <div class="container">
      <ProgressSpinner v-if="loading" />
      <form v-if="!loading">
        <div class="header__form">Авторизация</div>
        <FormControl>
          <UIInput
            column
            title="Логин"
            v-model="data.login"
            :size="inputSize"
            placeholder="Введите логин"
            @keydown.enter="onAuth"
          />
        </FormControl>
        <FormControl>
          <UIInput
            column
            v-model="data.password"
            title="Пароль"
            :size="inputSize"
            type="password"
            placeholder="Введите пароль"
            @keydown.enter="onAuth"
          />
        </FormControl>
        <FormControl>
          <Button @click="onAuth" label="Авторизироваться" severity="info" />
        </FormControl>
        <div v-if="listError.length > 0" class="error__block">
          <div>Список ошибок:</div>
          <ul>
            <li v-for="error in listError" :key="error">{{ error }}</li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg__container {
  width: 100vw;
  height: 100vh;
  background-color: rgb(11 52 89 / 89%);
  color: white;
}

.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

form {
  background-color: rgba(14, 47, 77, 0.89);
  padding: 15px 20px;
  border-radius: 15px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.57);
  margin: auto;

  &:deep(input){
    padding: 10px 10px;
    background-color: rgba(11, 67, 118, 0.89);
    color: white;

    &:focus{
      color: black;
      background-color: white;
    }
  }

  & .header__form {
    text-align: center;
    font-size: 14pt;
  }

  & .error__block {
    padding-top: 15px;
    color: #df0e0e;

    & ul {
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding-block: 10px;
    }
  }
}
</style>
