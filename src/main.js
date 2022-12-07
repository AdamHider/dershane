/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import PageContainer from './components/PageContainer.vue'


// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router'
import { useUserStore } from '@/store/user'
import { useAppMessage } from '@/composable/useAppMessage'

// Plugins
import { registerPlugins } from '@/plugins'


const app = createApp(App)

app.use(createPinia());
app.use(router);

app.component('page-container', PageContainer);

registerPlugins(app)

const { autoSignIn } = useUserStore()
useAppMessage()

autoSignIn()

app.mount('#app')



