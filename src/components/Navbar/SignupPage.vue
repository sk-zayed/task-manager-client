<template>
    <v-container>
        <v-form class="pt-4" ref="form">
            <v-text-field
                :rules="[rules.required]"
                v-model="form.name"
                label="Name"
            ></v-text-field>
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
            <v-text-field
                v-model="form.cnfrmpass"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.cnfrmpass]"
                :type="show ? 'text' : 'password'"
                label="Confirm password"
                @click:append="show = !show"
            ></v-text-field>
            <v-btn dark @click="signUp">SignUp</v-btn>
        </v-form>
    </v-container>
</template>

<script>
import Vue from "vue";
import config from '@/config';
import { signup } from "@/services/auth";
export default {
    name: "SignupPage",
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
                cnfrmpass: (value) =>
                    this.cnfrmpass(value) || "Password did not match",
            },
            form: {
                name: "",
                email: "",
                password: "",
                cnfrmpass: "",
            }
        };
    },
    methods: {
        cnfrmpass(value) {
            return this.form.password === value;
        },

        async signUp() {
            if (this.$refs.form.validate()) {
                try {
                    const response = await signup(this.form);
                    if (response.status === "success") {
                        // window.location.reload();
                        Vue.$toast.open({
                        message: "Registration successful.",
                        duration: config.duration,
                        type: "success"
                    });
                    this.$router.push({ name: "home" });
                    } else if (response.status === "error") {
                        Vue.$toast.open({
                        message: response.message,
                        duration: config.duration,
                        type: "error"
                    });
                    }
                } catch (error) {
                    Vue.$toast.open({
                        message: error.message,
                        duration: config.duration,
                        type: "error"
                    });
                }
            }
        },
    },
};
</script>
