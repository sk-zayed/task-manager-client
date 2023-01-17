<template>
  <v-card>
    <v-card-title class="pa-2 pl-4">{{ column.name }}</v-card-title>
    <div class="overflow-y-auto" style="max-height: 67vh">
      <v-card
        class="ma-3"
        max-width="400"
        v-for="card in column.cards"
        :key="card._id"
      >
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          @click="viewCard(card._id, card.lane)"
          style="cursor: pointer"
        >
        </v-img>
        <v-card-title>{{ card.title }}</v-card-title>
        <v-card-subtitle class="pt-1">
          Due:
          {{ utils.formatDate(card.dueDate) || "Not set!" }}
        </v-card-subtitle>
        <v-card-text class="text--primary">
          <v-row class="px-3 py-2" justify="space-between">
            <div>
              <v-icon>mdi-check</v-icon>
              {{ card.completed }}/{{ card.tasks.length }}
            </div>
            <div>
              <v-icon @click="deleteCard(card._id)">mdi-delete</v-icon>
            </div>
            <v-progress-circular
              :rotate="360"
              :size="25"
              :width="2"
              :value="card.progress"
              caption
              :color="
                card.progress <= 30
                  ? 'red'
                  : card.progress > 30 && card.progress <= 70
                  ? 'yellow'
                  : 'green'
              "
              ><div style="font-size: 0.7em">
                {{ Math.ceil(card.progress) }}%
              </div>
            </v-progress-circular>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
    <v-card-actions v-if="column.addCard">
      <v-btn block dark @click="createCard">Create card</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import board from "@/services/board";
import store from "@/store";
import utils from "@/services/utils";

export default {
  name: "BoardColumn",
  props: {
    column: Object,
  },
  data() {
    return {
      utils,
    };
  },
  methods: {
    createCard() {
      const cardObject = {
        title: "New card",
        description: null,
        priority: null,
        dueDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        tasks: [],
        image: null,
      };
      store.commit("setCardObject", cardObject);
      console.log("after ", store.getters.cardObject)
      this.$emit("openCard");
    },
    viewCard(cardId, lane) {
      if (lane === "ToDo") {
        const cardObject = store.getters.toDoArr.filter(
          (card) => card._id === cardId
        )[0];
        store.commit("setCardObject", cardObject);
      } else if (lane === "Doing") {
        const cardObject = store.getters.doingArr.filter(
          (card) => card._id === cardId
        )[0];
        store.commit("setCardObject", cardObject);
      } else if (lane === "Done") {
        const cardObject = store.getters.doneArr.filter(
          (card) => card._id === cardId
        )[0];
        store.commit("setCardObject", cardObject);
      }
      this.$emit("openCard");
    },
    async deleteCard(boardId) {
      try {
        store.commit("setLoading");
        await board.deleteCard(boardId);
        this.$emit("reload");
        utils.showToast("Added to trash!", "error");
      } catch (error) {
        utils.showToast(error.response.data.message, "error");
      }
    },
  },
};
</script>
