<template>
    <v-nav>
        <v-toolbar dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Task</span>
                <span>Manager</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-toolbar-items class="hidden-sm-and-down">
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

            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn text class="font-weight-light">
                    Logout
                    <v-icon right>mdi-export</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-navigation-drawer v-model="drawer" absolute temporary dark>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img
                        src="https://randomuser.me/api/portraits/men/78.jpg"
                    ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>John Leider</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list>
                <v-list-item
                    v-for="link in links"
                    :key="link.title"
                    :to="link.route"
                >
                    <v-list-item-icon>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ link.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-import</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Login</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon>mdi-export</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
            </v-list>
        </v-navigation-drawer>
    </v-nav>
</template>
<script>
export default {
    data() {
        return {
            drawer: null,
            query: "",
            menu: [
                { icon: "home", title: "Link A" },
                { icon: "info", title: "Link B" },
                { icon: "warning", title: "Link C" },
            ],
            links: [
                {
                    route: "/",
                    icon: "mdi-view-dashboard-variant",
                    title: "Boards",
                },
                {
                    route: "/calendar",
                    icon: "mdi-calendar",
                    title: "calender",
                },
                {
                    route: "/teams",
                    icon: "mdi-account-group",
                    title: "Teams",
                },
            ],
        };
    },
    methods: {
        search() {
            console.log(this.query);
        },
    },
};
</script>
<style scoped>
.width {
    width: 25em;
}
</style>
