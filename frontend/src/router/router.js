import {createRouter , createWebHistory} from "vue-router";
import HomeView from "@/view/HomeView.vue";
import MapView from "@/view/MapView.vue";
import MapV2View from "@/view/MapV2View.vue";
import SignUp from "@/components/auth/SignUp.vue";
import LoginPage from "@/components/auth/LoginPage.vue";
import { getToken } from '@/services/authService';
import Github from '@/view/GithubView.vue'

const routes = [
    {
        name: "SignUp",
        component: SignUp,
        path: "/signup",
    },
    {
        name: "Login",
        component: LoginPage,
        path: "/Login",
    },
    {
        name: "HomeView",
        component: HomeView,
        path: "/",
    },
    {
        name: "MapView",
        component: MapView,
        path: "/Map",
        meta: {
            requiresAuth: true,
        }
    },
    {
        name: "GithubView",
        component: Github,
        path: "/github",
    },
    {
        name: "MapV2View",
        component: MapV2View,
        path: "/mapV2",
        meta: {
            requiresAuth: true,
        }
    },
    
]

const router = createRouter({ 
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
        const isAuthenticated = !!getToken();
        if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
        } else {
        next();
        }
    });

export default router;