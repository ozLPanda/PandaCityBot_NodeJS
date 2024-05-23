<script setup>
import { RouterView } from 'vue-router'
import Header from "@/components/Header.vue"
import {useUserStore} from "@/stores/user.js";

const { token } = useUserStore()

</script>

<template>
  <Header v-if="token != null" />
  <RouterView />
</template>

<style scoped></style>
