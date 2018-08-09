<template>
    <main>
        <form>
            <img src="@/assets/img/cloud-logo.svg"
                 alt="logo"
                 class="logo">
            <input :placeholder="$t('index.form.nameOrEmail')"
                   class="text-input"
                   :class="{ 'input-error': $v.name.$error }"
                   type="text"
                   v-model="name"
                   maxlength="64"
                   @keydown.enter="tryLogin()">
            <input :placeholder="$t('index.form.password')"
                   class="text-input"
                   :class="{ 'input-error': $v.password.$error }"
                   type="password"
                   v-model="password"
                   maxlength="72"
                   @keydown.enter="tryLogin()">
            <div>
                <input type="checkbox"
                       v-model="checked">
                <span @click="checked = !checked">{{$t('index.form.stayLoggedIn')}}</span>
            </div>
            <input class="confirm-button"
                   :value="this.$i18n.t('index.form.login')"
                   type="button"
                   @click="tryLogin()">
        </form>
    </main>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
    head() {
        return {
            title: this.$t('title.home')
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
    methods: {
        async tryLogin() {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.loggingIn = true
                // Check if login is valid
                const res = await this.$axios.$post('/v1/auth/login', {
                    username: this.name,
                    password: this.password,
                    stayLoggedIn: this.checked
                })
                if (!res.error) {
                    this.$nextTick(() =>
                        $nuxt.$router.push({
                            name: `overview-dir___${this.$i18n.locale}`
                        })
                    )
                } else {
                    this.loggingIn = false
                }
            }
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

<style src="@/assets/css/pages/index" lang="scss" scoped></style>
