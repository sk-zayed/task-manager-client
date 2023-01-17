<template>
    <v-container class="pb-0">
        <ShowLoading></ShowLoading>
        <v-row>
            <v-col cols="7" class="ma-auto">
                <div class="text-h5" text>{{ boardData.title }}</div>
            </v-col>
            <v-col align="end">
                <v-icon class="pr-3" @click="infoDialog=true"
                    >mdi-information</v-icon
                >

                <!-- members list -->
                <BoardMembers></BoardMembers>
            </v-col>
        </v-row>
        <v-divider></v-divider>

        <!-- board info -->
        <BoardInfo :dialog="infoDialog" :boardData="boardData" @close="infoDialog=false"></BoardInfo>

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
                    @openCard="cardDialog=true"
                    @reload="fetchCards"
                ></BoardColumn>
            </div>
        </div>

        <!-- card dialog -->
        <CardDialog :dialog="cardDialog" @reload="fetchCards" @close="cardDialog=false"></CardDialog>
    </v-container>
</template>

<script>
// import draggable from "vuedraggable";
import ShowLoading from "@/components/Utils/ShowLoading.vue";
import BoardInfo from "./BoardInfo.vue";
import BoardMembers from "./BoardMembers.vue";
import BoardColumn from "./BoardColumn.vue";
import CardDialog from "./CardDialog.vue";
import store from "@/store";
import board from "@/services/board";
import utils from "@/services/utils";

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
            boardData: {},
            columns: [
                {
                    name: "ToDo",
                    columnArray: [],
                    addCard: true,
                },
                {
                    name: "Doing",
                    columnArray: [],
                },
                {
                    name: "Done",
                    columnArray: [],
                },
            ],
            infoDialog: false,
            cardDialog: false,
        };
    },
    methods: {
        async fetchCards() {
            try {
                const boardData = await board.fetchBoardById(
                    this.$route.params.id
                );
                this.boardData = boardData.data;
                const toDoArr = [];
                const doingArr = [];
                const doneArr = [];
                boardData.data.cards.forEach((card) => {
                    if (card.lane === "ToDo") {
                        toDoArr.push(card);
                    } else if (card.lane === "Doing") {
                        doingArr.push(card);
                    } else if (card.lane === "Done") {
                        doneArr.push(card);
                    }
                    this.columns[0].columnArray = toDoArr;
                    this.columns[1].columnArray = doingArr;
                    this.columns[2].columnArray = doneArr;
                });
                store.commit("setLoading");
                store.commit("setToDoArr", toDoArr);
                store.commit("setDoingArr", doingArr);
                store.commit("setDoneArr", doneArr);
            } catch (error) {
                utils.showToast(error.response.data.message, "error");
            }
        },
    },
    created() {
        store.commit("setLoading");
        this.fetchCards();
    },
};
</script>
