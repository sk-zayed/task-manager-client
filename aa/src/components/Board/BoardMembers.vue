<template>
  <v-menu offset-y :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <div class="d-inline" v-bind="attrs" v-on="on">
        <v-icon size="40" color="primary">mdi-account-multiple</v-icon>
        <v-icon color="primary">mdi-chevron-down</v-icon>
      </div>
    </template>
    <v-card>
      <v-card-title>Members ({{ members.length }})</v-card-title>
      <div class="overflow-y-auto" style="max-height: 50vh">
        <v-list class="text-center">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
            class="ma-3"
            v-if="loading"
          ></v-progress-circular>
          <v-list-item v-else v-for="member in members" :key="member._id">
            <v-list-item-avatar size="40" class="ma-0">
              <img :src="require('../../../public/user.png')" />
            </v-list-item-avatar>
            <v-list-item-content class="px-2">{{
              member.email
            }}</v-list-item-content>
            <v-icon @click="removeMember(member._id)">mdi-close</v-icon>
          </v-list-item>
        </v-list>
      </div>
      <v-divider></v-divider>
      <v-card-actions>
        <v-form ref="addMember" class="d-flex">
          <v-text-field
            v-model="memberEmail"
            label="Member email"
            solo
            prepend-inner-icon="mdi-account"
            dense
            hide-details
            class="pr-2"
            style="width: 11em"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
          <v-btn dark :loading="adding" @click="addMember">Add</v-btn>
        </v-form>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import board from "@/services/board";
import utils from "@/services/utils";

export default {
  name: "BoardMembers",
  data() {
    return {
      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
      members: [],
      adding: false,
      loading: false,
      memberEmail: null,
    };
  },
  methods: {
    async fetchMembers() {
      try {
        const boardData = await board.fetchBoardById(this.$route.params.id);
        this.members = boardData.data.members;
        this.loading = false;
      } catch (error) {
        utils.showToast(error.response.data.message, "error");
      }
    },
    async addMember() {
      try {
        if (this.$refs.addMember.validate()) {
          this.loading = true;
          this.adding = true;
          const response = await board.addMember({
            boardId: this.$route.params.id,
            memberEmail: this.memberEmail,
          });
          this.fetchMembers();
          this.memberEmail = null;
          if (response.status === "success") {
            utils.showToast("Member added successfully", "success");
          } else if (response.status === "error") {
            utils.showToast(response.message, "error");
          }
          this.adding = false;
        }
      } catch (error) {
        utils.showToast(error.response.data.message, "error");
      }
    },
    async removeMember(userId) {
      try {
        this.loading = true;
        const response = await board.removeMember({
          boardId: this.$route.params.id,
          userId: userId,
        });
        this.fetchMembers();
        if (response.status === "success") {
          utils.showToast("Member was removed!", "success");
        }
      } catch (error) {
        utils.showToast(error.response.data.message, "error");
      }
    },
  },
  created() {
    this.loading = true;
    this.fetchMembers();
  },
};
</script>