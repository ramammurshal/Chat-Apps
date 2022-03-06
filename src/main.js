import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";

// import firebase auth service
import { projectAuth } from "./firebase/config";

let app;

// mount aplikasi saat sudah terdapat perubahan state dari firebase
// ini mencegah error: refresh di page chatroom (awalnya akan langsung redirect ke welcome, karena route guard akan mem-filter user saat itu, dan user saat itu sebenarnya ada tapi butuh waktu untuk connect dahulu ke firebase)
projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});
