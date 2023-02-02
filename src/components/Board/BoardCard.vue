<template>
    <v-card class="px-auto d-flex flex-column">
        <div @click="openBoard(board._id)" style="cursor: pointer">
            <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
            </v-img>
            <v-card-title>{{ board.title }}</v-card-title>
            <v-card-subtitle class="py-1" v-if="$route.name === 'teams'">
                Created by: {{ board.owner.name }}
            </v-card-subtitle>
            <v-card-subtitle class="py-1">
                Due:
                {{ utils.formatDate(board.dueDate) || "Not set!" }}
            </v-card-subtitle>
        </div>
        <v-card-text class="text--primary">
            {{ utils.sliceStr(board.description) || "No description :(" }}
            <div
                v-if="board.description && board.description.length > 100"
                class="read-more"
                @click="openBoard(board._id)"
            >
                read more
            </div>
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-text>
            <v-row class="px-3 pb-2" justify="space-between">
                <div>
                    <v-icon>mdi-account-multiple</v-icon>
                    {{ board.members.length }}
                </div>
                <div>
                    <v-icon
                        :color="board.likedBy.includes(userId) ? 'red' : 'default'"
                        @click="likeBoard(board._id)"
                        >mdi-heart</v-icon
                    >
                </div>
                <div>
                    <v-icon @click="deleteBoard(board._id)">mdi-delete</v-icon>
                </div>
                <div>
                    <v-icon>mdi-check</v-icon>
                    {{ board.completed }}/{{ board.cards.length }}
                </div>
            </v-row>
            <v-progress-linear
                class="my-4"
                v-model="progress"
                :color="
                    board.progress <= 30
                        ? 'red'
                        : board.progress > 30 && board.progress <= 70
                        ? 'yellow'
                        : 'green'
                "
                height="15"
                rounded
            >
                <template v-slot:default="{ value }">
                    <strong>{{ Math.ceil(value) }}%</strong>
                </template>
            </v-progress-linear>
        </v-card-text>
    </v-card>
</template>
<script>
import board from "@/services/board";
import store from "@/store";
import utils from "@/services/utils";

export default {
    name: "BoardCard",
    props: {
        board: Object,
    },
    data() {
        return {
            utils,
        };
    },
    computed: {
        progress() {
            return this.board.progress;
        },
        userId() {
            return store.getters.userId;
        }
    },
    methods: {
        async likeBoard(boardId) {
            try {
                store.commit("setLoading");
                await board.likeBoard(boardId);
                this.$emit("reload");
            } catch (error) {
                utils.showToast(error.response.data.message, "error");
            }
        },
        openBoard(boardId) {
            store.commit("setLoading");
            this.$router.push({
                name: "board-details",
                params: { id: boardId },
            });
            store.commit("setLoading");
        },
        async deleteBoard(boardId) {
            try {
                store.commit("setLoading");
                await board.deleteBoard(boardId);
                this.$emit("reload");
                utils.showToast("Filling trash ;(", "error");
            } catch (error) {
                utils.showToast(error.response.data.message, "error");
            }
        },
    },
};
</script>
