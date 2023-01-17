<template>
    <v-container class="pb-0">
        <ShowLoading></ShowLoading>
        <v-row>
            <v-col cols="7" class="ma-auto">
                <div class="text-h5" text>{{ response.data.title }}</div>
            </v-col>
            <v-col align="end">
                <v-icon class="pr-3" @click="infoDialog = true"
                    >mdi-information</v-icon
                >

                <!-- members list -->
                <BoardMembers :response="response"></BoardMembers>
            </v-col>
        </v-row>
        <v-divider></v-divider>

        <!-- board info -->
        <BoardInfo
            :dialog="infoDialog"
            :boardData="response.data"
            @close="infoDialog = false"
        ></BoardInfo>

        <div style="background-color: none" class="overflow-x-auto d-flex">
            <div
                style="min-width: 375px; display: inline"
                class="pa-6"
                v-for="(column, idx) in columns"
                :key="idx"
            >
                <!-- board columns -->
                <BoardColumn
                    :column="column"
                    @openCard="cardDialog = true"
                    @reload="fetchCards"
                ></BoardColumn>
            </div>
        </div>

        <!-- card dialog -->
        <CardDialog
            :dialog="cardDialog"
            @reload="fetchCards"
            @close="cardDialog = false"
        ></CardDialog>
    </v-container>
</template>

<script>
import ShowLoading from "@/components/Utils/ShowLoading.vue";
import BoardInfo from "./BoardInfo.vue";
import BoardMembers from "./BoardMembers.vue";
import BoardColumn from "./BoardColumn.vue";
import CardDialog from "./CardDialog.vue";
import store from "@/store";
import board from "@/services/board";

export default {
    name: "CreateBoard",
    components: {
        ShowLoading,
        BoardInfo,
        BoardMembers,
        BoardColumn,
        CardDialog,
    },
    data() {
        return {
            response: {},
            columns: [
                {
                    name: "ToDo",
                    cards: [],
                    addCard: true,
                },
                {
                    name: "Doing",
                    cards: [],
                },
                {
                    name: "Done",
                    cards: [],
                },
            ],
            infoDialog: false,
            cardDialog: false,
        };
    },
    methods: {
        async fetchCards() {
            try {
                const response = await board.fetchBoardById(
                    this.$route.params.id
                );
                if (!response.data) {
                    return this.$router.push({ name: "page-not-found" });
                }
                this.response = response;
                const toDoArr = [];
                const doingArr = [];
                const doneArr = [];
                response.data.cards.forEach((card) => {
                    if (card.lane === "ToDo") {
                        toDoArr.push(card);
                    } else if (card.lane === "Doing") {
                        doingArr.push(card);
                    } else if (card.lane === "Done") {
                        doneArr.push(card);
                    }
                    this.columns[0].cards = toDoArr;
                    this.columns[1].cards = doingArr;
                    this.columns[2].cards = doneArr;
                });
                store.commit("setLoading");
                store.commit("setToDoArr", toDoArr);
                store.commit("setDoingArr", doingArr);
                store.commit("setDoneArr", doneArr);
            } catch (error) {
                this.$router.push({ name: "page-not-found" });
            }
        },
    },
    created() {
        store.commit("setLoading");
        this.fetchCards();
    },
};
</script>
