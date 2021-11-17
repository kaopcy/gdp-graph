import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue"),
    },
    {
        path: "/main-country/:id",
        name: "MainCountry",
        component: () => import("../views/MainCountry/MainCountry.vue"),
        children: [
            {
                path: "",
                name: "MainCountry",
                component: () =>
                    import("../views/MainCountry/MainCountryHome.vue"),
            },
            {
                path: "data",
                name: "Data",
                component: () => import("../views/MainCountry/Data.vue"),
            },
            {
                path: "graph",
                name: "Graph",
                component: () => import("../views/MainCountry/Graph.vue"),
            },
            {
                path: "year",
                name: "Year",
                component: () => import("../views/MainCountry/Year.vue"),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
