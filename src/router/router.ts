import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Registration from "@/pages/Registration.vue";
import { createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: '/', name: "Home", component: Home },
    {path: '/register', name: "Register", component: Registration },
    {path: '/login', name: "Login", component: Login }
];

export const route = createRouter({
    history: createWebHistory(),
    routes
});