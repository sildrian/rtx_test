import { createApp } from 'vue';

import Vue from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import router from './router';
import App from './App.vue';
import Axios from 'axios';
Axios.defaults.baseURL = process.env.VUE_APP_API_URL
Axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const app = createApp(App);
app.config.globalProperties.$http = Axios;

app.use(router);
app.use(ElementPlus);

app.mount('#app');
