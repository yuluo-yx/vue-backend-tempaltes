import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import './styles/dark.scss'

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");

// 禁止浏览器的回退操作，另一部分在router中
window.addEventListener('popstate', function() {
    history.pushState(null, "", document.URL)
})