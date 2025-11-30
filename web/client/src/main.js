import 'vue-toast/dist/vue-toast.min.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice';

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
// import VueToast from "vue-toast"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
// app.use(VueToast)

app.mount('#app')
