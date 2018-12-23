<template>
    <div class="center">
        <form>
            <TheLogo></TheLogo>

            <div class="form-section">
                <h2>{{ this.$i18n.t('views.resetPassword.resetPassword') }}</h2>
                <span class="subtitle">{{ this.$i18n.t('views.resetPassword.newPassword') }}</span>
            </div>

            <div class="form-section">
                <LandingInput
                    :icon="'lock'"
                    :placeholder="newPasswordPH"
                    :error="$v.password.$error"
                    @update:value="password = $event"
                ></LandingInput>
                <LandingInput
                    :icon="'lock'"
                    :placeholder="enterPasswordAgainPH"
                    :error="$v.passwordReType.$error"
                    @update:value="passwordReType = $event"
                ></LandingInput>
            </div>

            <div class="form-section">
                <input
                    class="confirm"
                    type="button"
                    :value="this.$i18n.t('views.resetPassword.send')"
                    @click="send()"
                />
                <input class="subConfirm" style="visibility: hidden;" type="button" />
            </div>
        </form>
    </div>
</template>

<script>
/* Imports */
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import TheLogo from '@/views/home/components/TheLogo'
import LandingInput from '@/components/LandingInput.vue'

export default {
    components: {
        TheLogo,
        LandingInput
    },
    data() {
        return {
            password: '',
            passwordReType: ''
        }
    },
    computed: {
        newPasswordPH: function() {
            return this.$t('views.resetPassword.yourNewPassword')
        },
        enterPasswordAgainPH: function() {
            return this.$t('views.resetPassword.enterPasswordAgainPH')
        }
    },
    methods: {
        send: function() {
            //     this.$v.$touch()
            //     if (!this.$v.$error) {
            //         this.$http
            //             .post('/v1/auth/forgotPassword', {
            //                 usernameOrEmail: this.username
            //             })
            //             .then(({ error }) => {
            //                 if (error) {
            //                     //TODO: Output error
            //                     console.log(error)
            //                     return
            //                 }
            //                 this.$parent.login = 'pw_reset_success'
            //             })
            //     }
        }
    },
    validations: {
        password: {
            required,
            minLength: minLength(4),
            maxLength: maxLength(72)
        },
        passwordReType: {
            required,
            minLength: minLength(4),
            maxLength: maxLength(72)
        }
    }
}
</script>

<style src="@/assets/scss/components/LandingForm.scss" lang="scss" scoped></style>
