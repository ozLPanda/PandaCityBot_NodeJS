<script setup>
import { useRouter } from 'vue-router'
import { reactive, ref, watch } from 'vue'

const routesLink = reactive([
  {
    name: 'Главная',
    routerName: 'home'
  },
  {
    name: 'Управление постройками',
    routerName: 'controlDatabase'
  },
  {
    name: 'Логи',
    routerName: 'logs'
  }
])

const router = useRouter()
let activePage = ref(null)

watch(
  () => router.currentRoute.value.name,
  (val) => {
    activePage.value = router.currentRoute.value.name
  }
)

function goTo(url) {
  if (router.currentRoute.value.name != url) router.push({ name: url })
}
</script>

<template>
  <header>
    <div class="container">
      <div class="header__btn__group">
        <div
          v-for="link in routesLink"
          :class="['btn', 'btn__block', { active: activePage == link.routerName }]"
        >
          <p class="btn__text" @click="goTo(link.routerName)">{{ link.name }}</p>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  padding: 5px 15px;
  width: 100%;
  height: 100%;
  background-color: #ffffff;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header__btn__group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;

    & .btn__block {
      border-bottom: 1px solid transparent;
      transition: 0.5s all;
    }

    & .active {
      border-bottom-color: var(--color-primary);
    }
  }
}
</style>