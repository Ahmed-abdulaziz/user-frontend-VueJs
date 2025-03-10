import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // تأكد من استيراد router
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

createApp(App)
  .use(router) // تأكد من إضافة router هنا
  .mount('#app');