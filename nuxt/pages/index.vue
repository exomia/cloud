<template>
    <main>
        <form>
            <img src="~/assets/img/cloud-logo.svg"
                 alt="logo"
                 class="logo">
            <input :placeholder="$t('index.form.nameOrEmail')"
                   class="text-input"
                   :class="{ 'input-error': $v.name.$error }"
                   type="text"
                   v-model="name"
                   maxlength="64">
            <input :placeholder="$t('index.form.password')"
                   class="text-input"
                   :class="{ 'input-error': $v.password.$error }"
                   type="password"
                   v-model="password"
                   maxlength="72">
            <div>
                <input type="checkbox"
                       v-model="checked">
                <span @click="checked = !checked">{{$t('index.form.stayLoggedIn')}}</span>
            </div>
            <input class="confirm-button"
                   :value="loginBtnValue"
                   type="button"
                   @click="tryLogin">
        </form>
    </main>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            name: '',
            password: '',
            checked: false,
            loginBtnValue: this.$i18n.t('index.form.login')
        }
    },
    methods: {
        async tryLogin() {
            this.$v.$touch()
            // if (!this.$v.$invalid) {
            this.$store.dispatch('loginUser', {
                username: this.name,
                password: this.password,
                stayLoggedIn: this.checked
            })
            // }
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
