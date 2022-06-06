import { createApp } from "vue";
import App from "./App.vue";

import router from "./Router";
import './assets/scss/style.scss'

createApp(App)
    .use(router)
    .mount("#app");
