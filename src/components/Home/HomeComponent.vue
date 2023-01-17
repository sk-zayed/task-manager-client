<template class="ma-0 pa-0">
    <div>
        <v-carousel cycle interval="3000" hide-delimiters show-arrows-on-hover>
            <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
            ></v-carousel-item>
        </v-carousel>
        <v-container>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-img src="kanban.png" class="ma-auto img-size"></v-img>
                </v-col>
                <v-col cols="12" sm="6" class="pa-16 ma-auto">
                    <div class="text-h4 pa-2">
                        Manage tasks using kanban board
                    </div>
                    <div class="text-body-1 pa-2">
                        Have a plan, organize everything, schedule it and use
                        the kanban tool to track the progress. It helps
                        visualizing work, limit work-in-progress, and maximize
                        efficiency (or flow). Task manger provides a kanban
                        board to track the progress of you plan. A perfect
                        execution of plan leads to successful results. Happy
                        growing!!
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" class="pa-16 ma-auto">
                    <div class="text-h4 pa-2">
                        Have a calendar to visulalize
                    </div>
                    <div class="text-body-1 pa-2">
                        Having a plan is good but a perfect execution is must.
                        In order to have a perfect execution one should
                        visualize its on-going and upcoming tasks. Visualizing
                        the progress of tasks helps in further planning and time
                        management. So visualize your tasks with task manager
                        and achieve whatever you want.
                    </div>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-img src="calendar.png" class="ma-auto img-size"></v-img>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-img src="team.png" class="ma-auto img-size"></v-img>
                </v-col>
                <v-col cols="12" sm="6" class="pa-16 ma-auto">
                    <div class="text-h4 pa-2">
                        Team up with your driven fellows
                    </div>
                    <div class="text-body-1 pa-2">
                        Teamwork is the collaborative effort of a group to
                        achieve a common goal or to complete a task in the most
                        effective and efficient way. Task manager helps you
                        track the overall progress of tasks contributed by each
                        team member. Let the teamwork show the world what you
                        are!
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-footer color="primary lighten-1" padless>
            <v-row justify="center" no-gutters>
                <v-btn color="white" text class="my-2"> Home </v-btn
                ><v-btn color="white" text rounded class="my-2"> About </v-btn
                ><v-btn color="white" text class="my-2"> Contact </v-btn>
                <v-col class="lighten-2 py-4 text-center white--text" cols="12">
                    Made with 🧡 by <strong>Zayed</strong>
                </v-col>
            </v-row>
        </v-footer>
    </div>
</template>
<script>
export default {
    name: "HomeComponent",
    data() {
        return {
            items: [
                {
                    src: "c-1.jpg",
                },
                {
                    src: "c-2.jpg",
                },
                {
                    src: "c-3.jpg",
                },
            ],
        };
    },
};
</script>
<style scoped>
.img-size {
    max-height: 20em;
    max-width: 20em;
}
</style>
