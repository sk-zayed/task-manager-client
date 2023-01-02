import { login } from "@/services/auth";

const KEY_NAME = "name";
const KEY_EMAIL = "email";
const KEY_TOKEN = "token";
const KEY_ROLE = "role";

const auth = {
    state: {
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
    },
    mutations: {
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
        // credentials = { email: string, password: string }
        // login( context, credentials ) {
        login({ commit }, credentials) {
            // console.log( context ); // { commit: fn, getters: fn, }

            return login(credentials).then((data) => {
                const { name, email, token, role } = data;

                localStorage.setItem(KEY_NAME, name);
                localStorage.setItem(KEY_EMAIL, email);
                localStorage.setItem(KEY_TOKEN, token);
                localStorage.setItem(KEY_ROLE, role);

                commit("setName", name);
                commit("setEmail", email);
                commit("setToken", token);
                commit("setRole", role);

                return email;
            });
        },
        logout({ commit }) {
            localStorage.removeItem(KEY_NAME);
            localStorage.removeItem(KEY_EMAIL);
            localStorage.removeItem(KEY_TOKEN);
            localStorage.removeItem(KEY_ROLE);

            commit("setName", "");
            commit("setEmail", "");
            commit("setToken", "");
            commit("setRole", "");

            return Promise.resolve();
        },
    },
};

export default auth;
