import Vuex from "vuex";
import auth from "./modules/auth";
import board from "./modules/board";

const store = new Vuex.Store({
    modules: {
        // auth: auth,
        auth,
        board,
    },
});

export default store;
