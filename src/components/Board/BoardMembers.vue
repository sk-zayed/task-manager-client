<template>
    <v-menu offset-y :close-on-content-click="false">
        <template v-slot:activator="{ on, attrs }">
            <div class="d-inline" v-bind="attrs" v-on="on">
                <v-icon size="40" color="primary">mdi-account-multiple</v-icon>
                <v-icon color="primary">mdi-chevron-down</v-icon>
            </div>
        </template>
        <v-card>
            <v-card-title
                >Members ({{ !members ? 0 : members.length }})</v-card-title
            >
            <div class="overflow-y-auto" style="max-height: 50vh">
                <v-list class="text-center">
                    <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                        class="ma-3"
                        v-if="loading"
                    ></v-progress-circular>
                    <v-list-item
                        v-else
                        v-for="member in members"
                        :key="member._id"
                    >
                        <v-list-item-avatar size="40" class="ma-0">
                            <img :src="require('../../../public/user.png')" />
                        </v-list-item-avatar>
                        <v-list-item-content class="px-2">{{
                            member.email
                        }}</v-list-item-content>
                        <v-icon v-if="isOwner" @click="removeMember(member._id)"
                            >mdi-close</v-icon
                        >
                    </v-list-item>
                </v-list>
            </div>
            <v-divider></v-divider>
            <v-card-actions>
                <v-form v-if="isOwner" ref="addMember" class="d-flex">
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
                <v-btn
                    v-else
                    dark
                    style="width: 100%"
                    @click="removeMember(null, true)"
                    >Leave Board</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-menu>
</template>

<script>
import board from "@/services/board";
import utils from "@/services/utils";

export default {
    name: "BoardMembers",
    props: {
        response: Object,
    },
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
            isOwner: null,
        };
    },
    methods: {
        async fetchMembers() {
            try {
                const boardData = await board.fetchBoardById(
                    this.$route.params.id
                );
                if (!boardData.data) {
                    return;
                }
                this.members = boardData.data.members;
            } catch (error) {
                utils.showToast(error.response.data.message, "error");
            }
        },
        async addMember() {
            try {
                if (this.$refs.addMember.validate()) {
                    this.loading = true;
                    this.adding = true;
                    await board.addMember({
                        boardId: this.$route.params.id,
                        memberEmail: this.memberEmail,
                    });
                    this.fetchMembers();
                    utils.showToast("Member added successfully", "success");
                }
            } catch (error) {
                utils.showToast(error.response.data.message, "error");
            } finally {
                this.memberEmail = null;
                this.adding = false;
                this.loading = false;
            }
        },
        async removeMember(userId, leave = false) {
            try {
                this.loading = true;
                await board.removeMember({
                    boardId: this.$route.params.id,
                    userId: userId,
                });
                if (leave) {
                    this.loading = false;
                    return this.$router.push({ name: "teams" });
                }
                this.fetchMembers();
                utils.showToast("Member was removed!", "success");
            } catch (error) {
                utils.showToast(error.response.data.message, "error");
            } finally {
                this.loading = false;
            }
        },
    },
    created() {
        this.loading = true;
        this.members = this.response.data.members;
        this.isOwner = this.response.isOwner;
        this.loading = false;
    },
};
</script>
