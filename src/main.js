/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import PageContainer from './components/PageContainer.vue'
import VOtpInput from "vue3-otp-input";


// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router'
import { useUserStore } from '@/store/user'

// Plugins
import { registerPlugins } from '@/plugins'


const app = createApp(App)

app.use(createPinia());
app.use(router);

app.component('page-container', PageContainer);
app.component('v-otp-input', VOtpInput);

registerPlugins(app)

app.mount('#app')

const { autoSignIn } = useUserStore()
autoSignIn()
