import authh from "@/services/auth";

const KEY_ID = "id";
const KEY_NAME = "name";
const KEY_EMAIL = "email";
const KEY_TOKEN = "token";
const KEY_ROLE = "role";

const auth = {
    state: {
        id: localStorage.getItem(KEY_ID) || "",
        name: localStorage.getItem(KEY_NAME) || "",
        email: localStorage.getItem(KEY_EMAIL) || "",
        token: localStorage.getItem(KEY_TOKEN) || "",
        role: localStorage.getItem(KEY_ROLE) || "",
    },
    getters: {
        isAuthenticated(state) {
            return !!state.token;
        },
        isAdmin(state) {
            return state.role === "admin";
        },
        userId(state){
            return state.id;
        },
        username(state) {
            return state.name;
        },
        token(state) {
            return state.token;
        },
    },
    mutations: {
        setId(state, id) {
            state.id = id;
        },
        setName(state, name) {
            state.name = name;
        },
        setEmail(state, email) {
            state.email = email;
        },
        setToken(state, token) {
            state.token = token;
        },
        setRole(state, role) {
            state.role = role;
        },
    },
    actions: {
        login({ commit }, credentials) {
            return authh.login(credentials).then((data) => {
                const { user, name, email, token, role } = data;

                localStorage.setItem(KEY_ID, user);
                localStorage.setItem(KEY_NAME, name);
                localStorage.setItem(KEY_EMAIL, email);
                localStorage.setItem(KEY_TOKEN, token);
                localStorage.setItem(KEY_ROLE, role);

                commit("setId", user);
                commit("setName", name);
                commit("setEmail", email);
                commit("setToken", token);
                commit("setRole", role);

                return name;
            });
        },
        logout({ commit }) {
            localStorage.removeItem(KEY_ID);
            localStorage.removeItem(KEY_NAME);
            localStorage.removeItem(KEY_EMAIL);
            localStorage.removeItem(KEY_TOKEN);
            localStorage.removeItem(KEY_ROLE);

            commit("setId", "");
            commit("setName", "");
            commit("setEmail", "");
            commit("setToken", "");
            commit("setRole", "");

            return Promise.resolve();
        },
    },
};

export default auth;
