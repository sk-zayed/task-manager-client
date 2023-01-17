<template>
  <v-container>
    <ShowLoading></ShowLoading>
    <v-row tile height="54">
      <v-btn icon class="ma-auto" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-col cols="3">
        <v-select
          v-model="type"
          :items="types"
          dense
          outlined
          hide-details
          class="ma-2"
          label="type"
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="mode"
          :items="modes"
          dense
          outlined
          width="500"
          hide-details
          label="event-overlap-mode"
          class="ma-2"
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="weekday"
          :items="weekdays"
          dense
          outlined
          hide-details
          label="weekdays"
          class="ma-2"
        ></v-select>
      </v-col>
      <v-btn icon class="ma-auto" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        event-color="black"
        @click:event="pushBoards"
      ></v-calendar>
    </v-sheet>
  </v-container>
</template>
<script>
import ShowLoading from "@/components/Utils/ShowLoading.vue";
import store from "@/store";
import calendar from "@/services/calendar";
import utils from "@/services/utils";

export default {
  name: "CalendarComponent",
  components: {
    ShowLoading,
  },
  data: () => ({
    type: "month",
    types: ["month", "week", "day", "4day"],
    mode: "stack",
    modes: ["stack", "column"],
    weekday: [0, 1, 2, 3, 4, 5, 6],
    weekdays: [
      { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
      { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
      { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
      { text: "Mon, Wed, Fri", value: [1, 3, 5] },
    ],
    value: "",
    events: [],
  }),
  methods: {
    pushBoards(event) {
      this.$router.push({
        name: "board-details",
        params: { id: event.event.boardId },
      });
    },
  },
  async created() {
    try {
      if (store.getters.isAuthenticated) {
        store.commit("setLoading");
        const response = await calendar.fetchEvents();
        this.events = response.data;
        store.commit("setLoading");
      }
    } catch (error) {
      utils.showToast(error.response.data.message, "error");
    }
  },
};
</script>
