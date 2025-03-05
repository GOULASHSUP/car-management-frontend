import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Import Vue Router
import "./style.css"; // Import Tailwind styles

const app = createApp(App);
app.use(router);
app.mount("#app");