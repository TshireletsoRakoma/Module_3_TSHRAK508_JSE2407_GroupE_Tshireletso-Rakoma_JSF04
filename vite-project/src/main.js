import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Import Vuex store
import router from './router'; // Import Vue Router

const app = createApp(App);

app.use(store); // Use Vuex store
app.use(router); // Use Vue Router

app.mount('#app');
