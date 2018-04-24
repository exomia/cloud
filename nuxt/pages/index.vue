<template>
    <div id="page">
        <img src="~/assets/img/cloud-logo.svg" alt="Logo" class="logo">
        <form>
            <input placeholder="Name/E-Mail" class="text-input" :class="{ 'input-error': $v.name.$invalid && name.length }" type="text" v-model="name" maxlength="64">
            <input placeholder="Passwort" class="text-input" :class="{ 'input-error': $v.password.$invalid && password.length }" type="password" v-model="password" maxlength="72">
            <div>
                <input
                  type="checkbox"
                  v-model="checked">
                <span @click="checked = !checked">Angemeldet bleiben</span>
            </div>
            <input class="confirm-button"
                    :value="loginBtnValue"
                    type="button"
                    @click="tryLogin">
        </form>
    </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
    layout: 'landing',
    data() {
        return {
            name: '',
            password: '',
            checked: false,
            loginBtnValue: 'Login'
        }
    },
    methods: {
        async tryLogin() {
            //if (!this.$v.name.$invalid && !this.$v.password.$invalid) {
            this.$store.dispatch('loginUser', {
                username: this.name,
                password: this.password,
                stayLoggedIn: this.checked
            })
            //}
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(64)
        },
        password: {
            required,
            minLength: minLength(6),
            maxLength: maxLength(72)
        }
    }
}
</script>

<style src="~/assets/css/pages/index.scss" lang="scss" scoped />
