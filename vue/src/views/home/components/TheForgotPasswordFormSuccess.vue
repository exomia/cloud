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
                <h3>
                    {{ this.$i18n.t('views.home.passwordResetSuccessText') }}
                </h3>
            </div>

            <div class="form-section" style="margin-top: 72px">
                <input
                    class="backToLogin"
                    type="button"
                    :value="this.$i18n.t('views.home.backToLogin')"
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
// import EnvelopeIcon from '@/assets/img/icon/envelope.svg'

export default {
    components: {
        LogoIcon
        // EnvelopeIcon
    },
    data() {
        return {
            username: '',
            usernamePH: this.$t('views.home.passwordResetUsernameEmail'),
            usernameFocused: false
        }
    },
    methods: {},
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
    src="@/views/home/components/TheForgotPasswordFormSuccess.scss"
    lang="scss"
    scoped
></style>
