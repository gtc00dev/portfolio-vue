import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.scss'
import VueGtag from 'vue-gtag-next'

const app = createApp(App)

app.use(router)
app.use(VueGtag, {
  property: { id: 'G-77BS9WKSE5' }
}, router)

app.mount('#app')