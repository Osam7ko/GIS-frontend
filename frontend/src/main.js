import { createApp } from 'vue'
import App from './App.vue'


// import VueSweetalert2 from 'vue-sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';

import '@fortawesome/fontawesome-free/css/all.min.css';
import router from './router/router.js';
import 'leaflet/dist/leaflet.css';


const app = createApp(App)

// app.use(VueSweetalert2);
app.use(router);

app.mount('#app');
