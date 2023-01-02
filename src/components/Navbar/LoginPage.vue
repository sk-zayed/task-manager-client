<template>
    <v-container>
        <v-form class="pt-4" ref="form">
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
            ></v-text-field>
            <v-btn dark @click="login">Login</v-btn>
        </v-form>
    </v-container>
</template>
<script>
import Vue from "vue";
import config from "@/config";
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
            }
        };
    },
    methods: {
        login() {
            if (this.$refs.form.validate()) {
                this.$store
                    .dispatch("login", this.form)
                    .then(() => {
                        // window.location.reload();
                        Vue.$toast.open({
                            message: "Login successful.",
                            duration: config.duration,
                            type: "success"
                        });
                        this.$router.push({ name: "home" });
                    })
                    .catch((error) => {
                        Vue.$toast.open({
                            message: error.response.data.message,
                            duration: config.duration,
                            type: "error"
                        });
                        this.form.email = "";
                        this.form.password = "";
                    });
            }
        },
    },
};
</script>
