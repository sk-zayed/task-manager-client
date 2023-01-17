import HomeComponent from "@/components/Home/HomeComponent.vue";
import LoginPage from "@/components/Navbar/LoginPage.vue";
import SignupPage from "@/components/Navbar/SignupPage.vue";
import ShowBoards from "@/components/Board/ShowBoards.vue";
import CalendarComponent from "@/components/Calendar/CalendarComponent.vue";
import KanbanBoard from "@/components/Board/KanbanBoard.vue";
import PageNotFound from "@/components/Utils/PageNotFound.vue";
import Router from "vue-router";
import store from "@/store";
import utils from "@/services/utils";

const meta = {
    authorize: ["admin", "general"],
};

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
            component: LoginPage,
        },
        {
            name: "boards",
            path: "/boards",
            component: ShowBoards,
            meta,
        },
        {
            name: "board-details",
            path: "/board/:id",
            props: true,
            component: KanbanBoard,
            meta,
        },
        {
            name: "calendar",
            path: "/calendar",
            component: CalendarComponent,
        },
        {
            name: "teams",
            path: "/teams",
            component: ShowBoards,
            meta,
        },
        {
            name: "page-not-found",
            path: "*",
            component: PageNotFound,
        },
    ],
});

router.beforeEach((to, from, next) => {
    const authorize = to.meta.authorize;

    // Right now, role-based authorization is NOT supported
    if (authorize && !store.getters.isAuthenticated) {
        utils.showToast("Please login first.", "error");
        return next({
            name: "login",
        });
    } else {
        if (authorize && !authorize.includes(store.state.auth.role)) {
            utils.showToast(
                "You do not have sufficient access to this page.",
                "error"
            );
            return next({
                path: "/",
            });
        }
    }

    next();
});

export default router;
