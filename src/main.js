import { createApp } from 'vue'
import pinia from "@/stores/index.js";
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import '@/assets/base.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.mount('#app')
