<template>
    <v-dialog v-model="loading" persistent width="500">
        <v-card color="primary" dark>
            <v-card-text class="py-2 px-3">
                Please stand by
                <v-progress-linear
                    indeterminate
                    color="white"
                    class="my-2"
                ></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: "ShowLoading",
    computed: {
        loading() {
            return this.$store.getters.loading;
        },
    },
};
</script>
