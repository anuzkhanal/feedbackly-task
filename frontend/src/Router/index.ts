import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/emoticon-average',
        alias: '/home',
        name: 'emoticon',
        component: () => import("@/components/Feedbackly.vue"),
    },
    {
        path: '/nps-groups',
        name: 'nps groups',
        component: () => import("@/components/Feedbackly.vue")
    },
    {
        path: '/nps-score',
        name: 'nps score',
        component: () => import("@/components/Feedbackly.vue")
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;