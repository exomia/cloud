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
            <div class="confirm-button-wrapper"
                 @click="tryLogin">
                <span>{{this.$i18n.t('index.form.login')}}</span>
                <span v-if="loggingIn"
                      class="loading"></span>
            </div>
        </form>
    </main>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
    head() {
        return {
            title: `${process.env.PROJECT_TITLE} - ${this.$i18n.t('title.home')}`
        }
    },
    data() {
        return {
            name: '',
            password: '',
            checked: false,
            loggingIn: false
        }
    },
    methods: {
        async tryLogin() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.loggingIn = true
                let res = await this.$store.dispatch('loginUser', {
                    username: this.name,
                    password: this.password,
                    stayLoggedIn: this.checked
                })
                if (res) {
                    $nuxt.$router.push({
                        name: `overview-dir___${this.$i18n.locale}`
                    })
                } else {
                    this.loggingIn = false
                }
            }
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
            minLength: minLength(4),
            maxLength: maxLength(72)
        }
    },
    watch: {
        checked() {
            if (this.checked && !this.$v.$invalid) {
                this.tryLogin()
            }
        }
    }
}
</script>

<style src="~/assets/css/pages/index.scss" lang="scss" scoped />
