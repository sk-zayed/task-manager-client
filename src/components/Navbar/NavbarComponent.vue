<template>
        <v-nav>
            <v-toolbar dark>
                <v-app-bar-nav-icon
                    @click.stop="drawer = !drawer"
                ></v-app-bar-nav-icon>
                <v-toolbar-title class="text-uppercase grey--text">
                    <router-link to="/" tag="span" style="cursor: pointer">
                        <span class="font-weight-light">Task</span>
                        <span class="white--text">Manager</span>
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
                    v-if="this.store.authenticated"
                >
                    <v-btn text class="font-weight-light">
                        Welcome {{ store.name }}!!
                    </v-btn>
                </v-toolbar-items>
                <v-toolbar-items
                    class="hidden-sm-and-down"
                    @click="logout"
                    v-if="this.store.authenticated"
                >
                    <v-btn text class="font-weight-light">
                        Logout
                        <v-icon right>mdi-export</v-icon>
                    </v-btn>
                </v-toolbar-items>
                <v-toolbar-items
                    class="hidden-sm-and-down"
                    v-if="!this.store.authenticated"
                >
                    <v-btn text class="font-weight-light" to="/login">
                        Login
                        <v-icon right>mdi-import</v-icon>
                    </v-btn>
                </v-toolbar-items>
                <v-toolbar-items
                    class="hidden-sm-and-down"
                    v-if="!this.store.authenticated"
                >
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
                                v-if="store.authenticated"
                                src="favicon.ico"
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
                        {{ store.name || "Welcome to task manager!"}}
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
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-light">{{
                                link.title
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <!-- <v-divider></v-divider> -->
                    <v-list-item
                        @click="logout"
                        v-if="this.store.authenticated"
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-export</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-light"
                                >Logout</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                    <!-- <v-divider></v-divider> -->
                    <v-list-item to="/signup" v-if="!this.store.authenticated">
                        <v-list-item-icon>
                            <v-icon>mdi-account-plus</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-light"
                                >SignUp</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/login" v-if="!this.store.authenticated">
                        <v-list-item-icon>
                            <v-icon>mdi-import</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-light"
                                >Login</v-list-item-title
                            >
                        </v-list-item-content>
                    </v-list-item>
                    <!-- <v-divider></v-divider> -->
                </v-list>
            </v-navigation-drawer>
        </v-nav>
</template>
<script>
import Vue from "vue";
import config from "@/config";
export default {
    data() {
        return {
            store: {
                authenticated: this.$store.getters.isAuthenticated,
                name: this.$store.state.auth.name,
                email: this.$store.state.auth.email,
                profile: "",
            },
            drawer: null,
            query: "",
            links: [
                {
                    route: "/",
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
            ]
        };
    },
    methods: {
        search() {
            console.log(this.query);
        },
        logout() {
            this.$store
                .dispatch("logout")
                .then(() => {
                    // window.location.reload();
                    Vue.$toast.open({
                        message: "Logout successful.",
                        duration: config.duration,
                        type: "success"
                    });
                })
                .catch((error) => {
                    Vue.$toast.open({
                        message: error.message,
                        duration: config.duration,
                        type: "error"
                    });
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
