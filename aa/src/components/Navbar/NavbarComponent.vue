<template>
    <v-nav>
        <v-toolbar dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text px-0">
                <router-link to="/" tag="span" style="cursor: pointer" class="d-flex">
                    <img src="title.png" width="60" class="ma-auto pb-3"/>
                    <div class="ma-auto">
                        <span class="font-weight-light">Task</span>
                        <span class="white--text">Manager</span>
                    </div>
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down mr-4">
                <v-text-field
                    v-model="query"
                    class="my-3 width"
                    hide-details
                    placeholder="Search"
                    filled
                    rounded
                    dense
                    single-line
                    append-icon="mdi-magnify"
                    @keyup.enter.prevent="search"
                ></v-text-field>
            </v-toolbar-items>
            <v-toolbar-items
                class="hidden-sm-and-down"
                to="/profile"
                v-if="authenticated"
            >
                <v-btn text class="font-weight-light">
                    Welcome {{ username }}!!
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items
                class="hidden-sm-and-down"
                @click="logout"
                v-if="authenticated"
            >
                <v-btn text class="font-weight-light">
                    Logout
                    <v-icon right>mdi-export</v-icon>
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items class="hidden-sm-and-down" v-if="!authenticated">
                <v-btn text class="font-weight-light" to="/login">
                    Login
                    <v-icon right>mdi-import</v-icon>
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items class="hidden-sm-and-down" v-if="!authenticated">
                <v-btn text class="font-weight-light" to="/signup">
                    SignUp
                    <v-icon right>mdi-account-plus</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" absolute temporary dark>
            <v-layout column align-center>
                <v-flex class="mt-6">
                    <v-avatar size="100">
                        <img
                            v-if="authenticated"
                            src="user.png"
                            alt="Profile picture"
                        />
                        <v-icon
                            v-else
                            aria-label="Account"
                            role="img"
                            size="100"
                        >
                            mdi-account
                        </v-icon>
                    </v-avatar>
                </v-flex>
                <p class="subheading white--text mt-2">
                    {{ username || "Welcome to task manager!" }}
                </p>
            </v-layout>
            <v-divider></v-divider>
            <v-list class="pt-0">
                <v-list-item
                    v-for="link in links"
                    :key="link.title"
                    :to="link.route"
                >
                    <v-list-item-icon>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="font-weight-light"
                        >{{ link.title }}
                    </v-list-item-title>
                </v-list-item>
                <v-list-item @click="logout" v-if="authenticated">
                    <v-list-item-icon>
                        <v-icon>mdi-export</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="font-weight-light"
                        >Logout</v-list-item-title
                    >
                </v-list-item>
                <v-list-item to="/signup" v-if="!authenticated">
                    <v-list-item-icon>
                        <v-icon>mdi-account-plus</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="font-weight-light"
                        >SignUp</v-list-item-title
                    >
                </v-list-item>
                <v-list-item to="/login" v-if="!authenticated">
                    <v-list-item-icon>
                        <v-icon>mdi-import</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="font-weight-light"
                        >Login</v-list-item-title
                    >
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-nav>
</template>
<script>
import store from "@/store";
import utils from "@/services/utils";

export default {
    data() {
        return {
            store: {
                email: store.getters.email,
                profile: "",
            },
            drawer: null,
            query: "",
            links: [
                {
                    route: "/",
                    icon: "mdi-home",
                    title: "Home",
                },
                {
                    route: "/boards",
                    icon: "mdi-view-dashboard-variant",
                    title: "Boards",
                },
                {
                    route: "/calendar",
                    icon: "mdi-calendar",
                    title: "Calender",
                },
                {
                    route: "/teams",
                    icon: "mdi-account-group",
                    title: "Teams",
                },
            ],
        };
    },
    computed: {
        authenticated() {
            return store.getters.isAuthenticated;
        },
        username() {
            return store.getters.username;
        },
    },
    methods: {
        search() {
            console.log(this.query);
        },
        logout() {
            store
                .dispatch("logout")
                .then(() => {
                    this.$router.push("/");
                    utils.showToast("Logout successful.", "success");
                })
                .catch((error) => {
                    utils.showToast(error.response.data.message, "error");
                });
        },
    },
};
</script>
<style scoped>
.width {
    width: 25em;
}
</style>
