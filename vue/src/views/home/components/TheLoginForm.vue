<template>
    <div class="center">
        <form class="login-form">
            <TheLogo></TheLogo>
            <div class="form-section" style="margin-top: 96px">
                <div
                    class="input-wrapper"
                    :class="{
                        'input-wrapper-error': $v.username.$error
                    }"
                >
                    <div class="icon-wrapper">
                        <UserIcon class="input-icon" />
                    </div>
                    <input
                        v-model="username"
                        type="text"
                        :placeholder="[usernameFocused ? '' : usernamePH]"
                        @focus="usernameFocused = true"
                        @blur="usernameFocused = false"
                        @keydown.enter="signIn()"
                    />
                </div>
                <div
                    class="input-wrapper"
                    :class="{
                        'input-wrapper-error': $v.password.$error
                    }"
                >
                    <div class="icon-wrapper">
                        <LockIcon class="input-icon" />
                    </div>
                    <input
                        v-model="password"
                        type="password"
                        :placeholder="[passwordFocused ? '' : passwordPH]"
                        @focus="passwordFocused = true"
                        @blur="passwordFocused = false"
                        @keydown.enter="signIn()"
                    />
                </div>
            </div>
            <div class="form-section">
                <input
                    class="confirm"
                    type="button"
                    :value="this.$i18n.t('views.home.signIn')"
                    @click="signIn()"
                />
                <input
                    class="subConfirm"
                    type="button"
                    :value="this.$i18n.t('views.home.forgotPassword')"
                    @click="$parent.login = 'pw_reset'"
                />
            </div>
        </form>
    </div>
</template>

<script>
/* Imports */
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import TheLogo from '@/views/home/components/TheLogo'

/* SVG */
import UserIcon from '@/assets/img/icon/login/user.svg'
import LockIcon from '@/assets/img/icon/login/lock.svg'

export default {
    components: {
        UserIcon,
        LockIcon,
        TheLogo
    },
    data() {
        return {
            username: '',
            usernameFocused: false,
            password: '',
            passwordFocused: false
        }
    },
    computed: {
        usernamePH: function() {
            return this.$t('views.home.nameOrEmail')
        },
        passwordPH: function() {
            return this.$t('views.home.password')
        }
    },
    methods: {
        signIn: async function() {
            this.$v.$touch()
            if (!this.$v.$error) {
                this.$http
                    .post('/v1/auth/login', {
                        username: this.username,
                        password: this.password
                    })
                    .then(({ data, error }) => {
                        if (!error) {
                            this.$store.commit('setUserInfo', data)
                            this.$router.push({ name: 'overview-dir' })
                        }
                    })
            }
        }
    },
    validations: {
        username: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(64)
        },
        password: {
            required,
            minLength: minLength(4),
            maxLength: maxLength(72)
        }
    }
}
</script>

<style src="@/views/home/components/Forms.scss" lang="scss" scoped></style>
