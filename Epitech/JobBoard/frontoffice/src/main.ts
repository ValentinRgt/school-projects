import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/index.css'
import { useUserStore } from './stores/User'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUsers, faEnvelopeOpenText, faBuilding } from '@fortawesome/free-solid-svg-icons'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(ToastPlugin, { position: 'top-right' })

const userStore = useUserStore()
await userStore.checkIfAuthenticated()
app.config.globalProperties.$user = userStore

app.use(router)
library.add(faUsers, faEnvelopeOpenText, faBuilding)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
