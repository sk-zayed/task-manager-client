import HomeComponent from "@/components/Home/HomeComponent.vue";
import Router from "vue-router";

const router = new Router({
    mode: "history",
    routes: [
        {
            name: "home",
            path: "/",
            component: HomeComponent
        },
        {
            name: "calendar",
            path: "/calendar",
            component: HomeComponent
        },
        {
            name: "teams",
            path: "/teams",
            component: HomeComponent
        }
    ]
});

export default router;