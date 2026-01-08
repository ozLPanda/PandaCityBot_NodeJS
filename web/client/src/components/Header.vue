<script setup>
import { useRouter } from 'vue-router'
import { reactive, ref, watch } from 'vue'
import logoutIcon from '@/assets/icons/logout-icon.svg'
import UIIconButton from '@/components/UI/UIIconButton.vue'
import { useUserStore } from '@/stores/user.js'

const { clearToken } = useUserStore()

const routesLink = reactive([
  {
    name: 'Главная',
    routerName: 'home'
  },
  {
    name: 'Таблицы',
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

function logOut() {
  clearToken()
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
      <div class="header__options">
        <UIIconButton :icon="logoutIcon" @click="logOut" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  position: sticky;
  top: 0;
  z-index: 20;
  padding: 14px 18px;
  width: 100%;
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--stroke-0);
  box-shadow: 0 10px 25px rgba(15, 29, 45, 0.08);

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
      border-radius: 10px;
      border: 1px solid transparent;
      padding: 6px 12px;
      transition: 0.2s ease;
      color: var(--ink-1);

      &:hover {
        background: rgba(27, 127, 121, 0.1);
        border-color: rgba(27, 127, 121, 0.25);
      }
    }

    & .active {
      background: rgba(27, 127, 121, 0.16);
      border-color: rgba(27, 127, 121, 0.4);
      box-shadow: 0 8px 18px rgba(27, 127, 121, 0.12);
    }

    & .btn__text {
      margin: 0;
      font-weight: 600;
      letter-spacing: 0.2px;
    }
  }
}
</style>
