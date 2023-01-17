<template>
  <v-dialog v-model="show" width="600" @click:outside="$emit('close')">
    <v-card class="pa-5">
      <div class="text-h5 pa-1">
        {{ boardData.title }}
      </div>
      <div class="text--secondary pa-1">
        Due: {{ utils.formatDate(boardData.dueDate) || "Not set!" }}
      </div>
      <div class="pa-1">
        {{ boardData.desc || "No description!" }}
      </div>
      <div>
        <v-row class="ma-0 pt-2">
          <v-col class="pa-0">
            <div class="text--secondary pa-1">Completed Cards:</div>
            <div class="py-3 pl-1" style="font-size: 35px">
              {{ boardData.completed }}/{{ (boardData.cards) ? boardData.cards.length : 0}}
            </div>
          </v-col>
          <v-col class="pa-0">
            <div class="text--secondary pa-1">Progress:</div>
            <div class="py-1 pl-3">
              <v-progress-circular
                :rotate="360"
                :size="75"
                :width="10"
                :value="boardData.progress"
                caption
                :color="
                  boardData.progress <= 30
                    ? 'red'
                    : boardData.progress > 30 && boardData.progress <= 70
                    ? 'yellow'
                    : 'green'
                "
                ><div style="font-size: 0.7em">
                  {{ Math.ceil(boardData.progress) }}%
                </div>
              </v-progress-circular>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
import utils from "@/services/utils";

export default {
  name: "BoardInfo",
  props: {
    dialog: Boolean,
    boardData: Object,
  },
  data() {
    return {
      utils,
    };
  },
  computed: {
    show() {
      return this.dialog;
    },
  },
};
</script>
