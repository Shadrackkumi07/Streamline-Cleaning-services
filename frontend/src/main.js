import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import i18n from './i18n/index.js';
import './styles/base.css';
import { enforceHttps } from './utils/security';

const app = createApp(App);
enforceHttps();
app.use(router);
app.use(i18n);
app.mount('#app');
