<script setup>
import UIInput from '@/components/UI/UIInput.vue'
import FormControl from '@/components/UI/FormControl.vue'
import Button from 'primevue/button'
import { onMounted, reactive, ref } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import { api } from '@/composables/api.js'

const inputSize = ref('350px')
let loading = ref(false)
let data = reactive({
  login: null,
  password: null
})

function onAuth() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1500)
}

onMounted(async () => {
  await api.get('/admin/check').then(({ data }) => {
    console.log(data)
  })
})
</script>

<template>
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
        />
      </FormControl>
      <FormControl>
        <Button @click="onAuth" label="Авторизироваться" severity="info" />
      </FormControl>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

form {
  padding: 15px 20px;
  border-radius: 15px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.57);
  margin: auto;

  & .header__form {
    text-align: center;
    font-size: 14pt;
  }
}
</style>
