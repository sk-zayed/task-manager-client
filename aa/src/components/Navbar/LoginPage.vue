<template>
    <v-container>
        <v-form class="pt-4" ref="loginForm">
            <v-text-field
                :rules="[rules.required, rules.email]"
                label="Email"
                v-model="form.email"
            ></v-text-field>
            <v-text-field
                v-model="form.password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.password]"
                :type="show ? 'text' : 'password'"
                label="Password"
                @click:append="show = !show"
                @keyup.enter="login"
            ></v-text-field>
            <v-btn dark @click="login">Login</v-btn>
        </v-form>
        <div class="pt-8">
            <div class="text--secondary pb-3">
                Tesing credentials:
            </div>
            <div class="text--secondary">
                email: zayed@example.com
            </div>
            <div class="text--secondary">
                password: zayed@123
            </div>
        </div>
    </v-container>
</template>
<script>
import store from "@/store";
import utils from "@/services/utils";

export default {
    name: "LoginPage",
    data() {
        return {
            show: false,
            processing: false,
            rules: {
                required: (value) => !!value || "Required.",
                email: (value) => {
                    const pattern =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return pattern.test(value) || "Invalid e-mail.";
                },
                password: (value) =>
                    value.length >= 8 || "Min 8 characters are required",
            },
            form: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        login() {
            if (this.$refs.loginForm.validate()) {
                store
                    .dispatch("login", this.form)
                    .then((user) => {
                        utils.showToast(`Welcome ${user}!!`, "success");
                        this.$router.push({ name: "home" });
                    })
                    .catch((error) => {
                        utils.showToast(error.response.data.message, "error");
                        this.form.email = "";
                        this.form.password = "";
                    });
            }
        },
    },
};
</script>
