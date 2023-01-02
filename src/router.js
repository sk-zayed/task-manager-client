import Vue from "vue";
import HomeComponent from "@/components/Home/HomeComponent.vue";
import LoginPage from "@/components/Navbar/LoginPage.vue";
import SignupPage from "@/components/Navbar/SignupPage.vue";
import Router from "vue-router";
import store from "@/store"
import config from "@/config";

const meta = {
    authorize: ["admin", "general"]
}

const router = new Router({
    mode: "history",
    routes: [
        {
            name: "home",
            path: "/",
            component: HomeComponent,
        },
        {
            name: "signup",
            path: "/signup",
            component: SignupPage,
        },
        {
            name: "login",
            path: "/login",
            component: LoginPage
        },
        {
            name: "calendar",
            path: "/calendar",
            component: HomeComponent,
            meta

        },
        {
            name: "teams",
            path: "/teams",
            component: HomeComponent,
            meta
        }
    ]
});

router.beforeEach(( to, from, next ) => {
    const authorize = to.meta.authorize;

    // Right now, role-based authorization is NOT supported
    if( authorize && !store.getters.isAuthenticated ) {
        Vue.$toast.open({
            message: "Please login first.",
            duration: config.duration,
            type: "error"
        });
        return next({
            name: 'login'
        });
    } else {
        if( authorize && !authorize.includes( store.state.auth.role ) ) {
            Vue.$toast.open({
                message: "You do not have sufficient access to this page.",
                duration: config.duration,
                type: "error"
            });
            return next({
                path: '/'
            });
        }
    }

    next();
});

export default router;