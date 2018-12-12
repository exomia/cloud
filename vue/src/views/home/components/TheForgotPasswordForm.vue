<template>
    <div class="center">
        <form class="login-form">
            <div class="form-section">
                <LogoIcon class="logo" />
                <h1>Exomia Cloud</h1>
            </div>
            <div class="form-section" style="margin-top: 35px">
                <h2>{{ this.$i18n.t('views.home.passwordReset') }}</h2>
            </div>
            <div class="form-section" style="margin-top: 25px">
                <h3>{{ this.$i18n.t('views.home.passwordResetText') }}</h3>
            </div>

            <div class="form-section" style="margin-top: 25px">
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
                    />
                </div>
            </div>
            <div class="form-section" style="margin-top: 33px">
                <input
                    class="send"
                    type="button"
                    :value="this.$i18n.t('views.home.send')"
                    @click="send()"
                />
                <input
                    class="goBack"
                    type="button"
                    :value="this.$i18n.t('views.home.back')"
                    @click="$parent.login = 'login'"
                />
            </div>
        </form>
    </div>
</template>

<script>
/* Imports */
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

/* SVG */
import LogoIcon from '@/assets/img/icon/login/logo.svg'
import UserIcon from '@/assets/img/icon/login/user.svg'

export default {
    components: {
        LogoIcon,
        UserIcon
    },
    data() {
        return {
            username: '',
            usernameFocused: false
        }
    },
    computed: {
        usernamePH: function() {
            return this.$t('views.home.passwordResetUsernameEmail')
        }
    },
    methods: {
        send: function() {
            this.$parent.login = 'pw_reset_success'
        }
    },
    validations: {
        username: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(64)
        }
    }
}
</script>

<style
    src="@/views/home/components/TheForgotPasswordForm.scss"
    lang="scss"
    scoped
></style>
