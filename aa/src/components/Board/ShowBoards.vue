<template>
    <v-container>
        <ShowLoading></ShowLoading>
        <h1>
            {{ $route.name === "boards" ? "Your Boards" : "Teams' Boards" }}
        </h1>
        <v-divider class="my-3"></v-divider>
        <v-row>
            <v-col
                sm="6"
                md="4"
                lg="3"
                class="d-flex"
                v-for="board in boards"
                :key="board._id"
            >
                <!-- boards -->
                <BoardCard :board="board" @reload="fetchBoards"></BoardCard>
            </v-col>
        </v-row>

        <!-- create board dialog -->
        <CreateBoard
            :dialog="createDialog"
            @reload="fetchBoards"
            @close="createDialog = false"
        ></CreateBoard>

        <!-- floating action button -->
        <v-btn
            fab
            bottom
            right
            fixed
            large
            dark
            class="ma-16"
            @click="createDialog = true"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-container>
</template>
<script>
import ShowLoading from "@/components/Utils/ShowLoading.vue";
import BoardCard from "./BoardCard.vue";
import CreateBoard from "./CreateBoard.vue";
import board from "@/services/board";
import store from "@/store";
import utils from "@/services/utils";

export default {
    name: "UserBoards",
    components: {
        ShowLoading,
        BoardCard,
        CreateBoard,
    },
    data() {
        return {
            createDialog: false,
            boards: [],
            utils,
        };
    },
    methods: {
        async fetchBoards() {
            try {
                if (this.$route.name === "boards") {
                    console.log("b");
                    const myBoards = await board.fetchMyBoards();
                    this.boards = myBoards.data;
                }
                if (this.$route.name === "teams") {
                    console.log("t");
                    const teamsBoards = await board.fetchTeamsBoards();
                    this.boards = teamsBoards.data;
                }
                store.commit("setLoading");
            } catch (error) {
                utils.showToast(error.response.data.message, "error");
            }
        },
    },
    async created() {
        store.commit("setLoading");
        this.fetchBoards();
    },
};
</script>
<style>
.read-more {
    display: inline;
    color: rgb(0, 0, 0, 0.5);
    cursor: pointer;
}
</style>
