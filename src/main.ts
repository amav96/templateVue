import { createApp } from "vue";
// import "./style.css";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/Router";

import BaseApiUrl from './services/BaseApiUrl';

const pinia = createPinia();
const app = createApp(App)
  .use(pinia)
  .use(router)
  .mount("#app");

app.$.appContext.config.globalProperties.$api = BaseApiUrl
