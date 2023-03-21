import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from 'axios';

axios.defaults.baseURL = 'https://8080-mineda-springlabiv20231-861r9pte7ev.ws-us90.gitpod.io/';

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
