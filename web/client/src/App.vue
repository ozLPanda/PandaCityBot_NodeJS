<script setup>
import { RouterView, useRouter } from 'vue-router'
import Header from '@/components/Header.vue'
import { useUserStore } from '@/stores/user.js'
import { computed, watch } from 'vue'

let userStore = useUserStore()
const router = useRouter()

let token = computed(() => {
  return userStore.token
})

watch(
  () => userStore.token,
  (val) => {
    if (val == null) {
      router.replace({name: 'login'})
    }
  }
)
</script>

<template>
  <Header v-if="token != null" />
  <RouterView />
</template>

<style scoped></style>
