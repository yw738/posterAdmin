import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import './styles/index.scss'
import router from './router/index.js'
import App from './App.vue'
const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus).use(pinia).use(router)
app.mount('#app')
