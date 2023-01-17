<template>
    <!-- card form -->
    <div class="text-center">
        <v-dialog v-model="show" width="800" @click:outside="$emit('close')">
            <v-card>
                <v-form ref="cardData">
                    <v-card-title class="text-h5 grey lighten-2"
                        >Card details</v-card-title
                    >
                    <v-card-text class="pt-6">
                        <v-text-field
                            v-model="cardData.title"
                            label="Title"
                            solo
                            prepend-icon="mdi-folder"
                            :rules="[rules.required]"
                        ></v-text-field>
                        <v-textarea
                            v-model="cardData.description"
                            solo
                            auto-grow
                            rows="1"
                            counter
                            clearable
                            clear-icon="mdi-close-circle"
                            label="Description"
                            prepend-icon="mdi-text"
                        ></v-textarea>
                        <v-select
                            v-model="cardData.priority"
                            solo
                            :items="items"
                            label="Priority"
                            prepend-icon="mdi-label"
                        ></v-select>
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
                                v-model="cardData.dueDate"
                                no-title
                                @input="showDatePicker = false"
                            ></v-date-picker>
                        </v-menu>
                        <!-- todo list start -->
                        <v-text-field
                            v-model="newTask"
                            label="What are you working on?"
                            solo
                            prepend-icon="mdi-order-bool-ascending-variant"
                            @keydown.enter="addTask"
                        >
                            <template v-slot:append>
                                <v-fade-transition>
                                    <v-icon v-if="newTask" @click="addTask">
                                        mdi-plus-circle
                                    </v-icon>
                                </v-fade-transition>
                            </template>
                        </v-text-field>

                        <v-card v-if="cardData.tasks" class="ml-8">
                            <v-progress-linear
                                :value="progress"
                            ></v-progress-linear>
                            <v-slide-y-transition class="py-0" group>
                                <template>
                                    <v-list-item
                                        v-for="(task, idx) in cardData.tasks"
                                        :key="idx"
                                    >
                                        <v-list-item-action>
                                            <v-checkbox
                                                v-model="task.done"
                                                :color="
                                                    (task.done && 'grey') ||
                                                    'primary'
                                                "
                                            >
                                                <template v-slot:label>
                                                    <div
                                                        :class="
                                                            (task.done &&
                                                                'grey--text') ||
                                                            'primary--text'
                                                        "
                                                        class="ml-4"
                                                        v-text="task.title"
                                                    ></div>
                                                </template>
                                            </v-checkbox>
                                        </v-list-item-action>

                                        <v-spacer></v-spacer>

                                        <v-scroll-x-transition>
                                            <v-icon
                                                v-if="task.done"
                                                color="success"
                                            >
                                                mdi-check
                                            </v-icon>
                                        </v-scroll-x-transition>
                                    </v-list-item>
                                </template>
                            </v-slide-y-transition>
                        </v-card>
                        <!-- todo list end -->
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text @click="$emit('close')">Close</v-btn>
                        <v-btn text @click="saveCard">Commit</v-btn>
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
    name: "CardDialog",
    props: {
        dialog: Boolean,
    },
    data() {
        return {
            showDatePicker: false,
            items: ["High", "Medium", "Low"],
            dateMenu: false,
            newTask: null,
            rules: {
                required: (value) => !!value || "Required.",
            },
        };
    },
    computed: {
        show() {
            return this.dialog;
        },
        cardData() {
            return store.getters.cardObject;
        },
        formatDate() {
            return utils.formatDate(this.cardData.dueDate);
        },
        progress() {
            if (this.cardData.tasks.length > 0) {
                const done = this.cardData.tasks.filter(
                    (task) => task.done === true
                ).length;
                return (done / this.cardData.tasks.length) * 100;
            }
            return 0;
        },
    },
    methods: {
        async saveCard() {
            try {
                if (this.$refs.cardData.validate()) {
                    this.$emit("close");
                    if (this.cardData._id) {
                        store.commit("setLoading");
                        await board.updateCard(this.cardData);
                        this.$emit("reload");
                        utils.showToast("Updation triggered!", "success");
                    } else {
                        const cardData = {
                            ...this.cardData,
                            board: this.$route.params.id,
                        };
                        store.commit("setLoading");
                        await board.createCard(cardData);
                        this.$emit("reload");
                        utils.showToast(
                            "Seems like you have a plan ;)",
                            "success"
                        );
                    }
                }
            } catch (error) {
                utils.showToast(error.response.data.message, "error");
            }
        },
        addTask() {
            if (this.newTask) {
                this.cardData.tasks.push({ done: false, title: this.newTask });
                this.newTask = null;
            }
        },
    },
};
</script>
