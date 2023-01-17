<template>
    <v-app>
        <NavbarComponent/>
        <router-view></router-view>
    </v-app>
</template>

<script>
import NavbarComponent from "@/components/Navbar/NavbarComponent.vue";
export default {
    name: "App",
    components: {
        NavbarComponent,
    },
};
</script>
