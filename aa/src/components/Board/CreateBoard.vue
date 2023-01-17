<template>
  <div class="text-center">
    <v-dialog v-model="show" width="800">
      <v-card>
        <v-form ref="newBoardData">
          <v-card-title class="text-h5 grey lighten-2"
            >Create board</v-card-title
          >
          <v-card-text class="pt-6">
            <v-text-field
              v-model="newBoardData.title"
              label="Title"
              solo
              prepend-icon="mdi-file-chart-check-outline"
              :rules="[rules.required]"
            ></v-text-field>
            <v-textarea
              v-model="newBoardData.description"
              solo
              auto-grow
              rows="1"
              counter
              clearable
              clear-icon="mdi-close-circle"
              label="Description"
              prepend-icon="mdi-text"
            ></v-textarea>
            <v-menu
              ref="showDatePicker"
              v-model="showDatePicker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="formatDate"
                  solo
                  label="Due date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="newBoardData.dueDate"
                no-title
                @input="showDatePicker = false"
              ></v-date-picker>
            </v-menu>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="$emit('close')">Close</v-btn>
            <v-btn text @click="createBoard">Create</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import board from "@/services/board";
import store from "@/store";
import utils from "@/services/utils";

export default {
  name: "CreateBoard",
  props: {
    dialog: Boolean,
  },
  computed: {
    formatDate() {
      return utils.formatDate(this.newBoardData.dueDate);
    },
    show() {
      return this.dialog;
    },
  },
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
      },
      showDatePicker: false,
      dateMenu: false,
      newBoardData: this.resetBoardData(),
      boards: [],
      utils,
    };
  },
  methods: {
    resetBoardData() {
      return {
        title: null,
        description: null,
        dueDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
        image: null,
      };
    },
    async createBoard() {
      try {
        if (this.$refs.newBoardData.validate()) {
          this.$emit("close");
          store.commit("setLoading");
          await board.createBoard(this.newBoardData);
          this.$emit("reload");
          this.newBoardData = this.resetBoardData();
          utils.showToast("Woahh!!, a board was created", "success");
        }
      } catch (error) {
        utils.showToast(error.response.data.message, "error");
      }
    },
  },
};
</script>