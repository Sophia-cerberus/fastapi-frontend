import { createRouter, createWebHistory } from 'vue-router'

const modules = import.meta.glob('./modules/*.ts', { eager: true })

const routes = Object.values(modules).map((mod: any) => mod.default)

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            component: () => NaN,
            children: routes
        },
        {
            path: '',
            component: () => NaN
        },
        {
            path: '*',
            redirect: '/error-404'
        }
    ],
})


export default router