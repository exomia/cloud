<template>
    <div class="center">
        <form>
            <TheLogo></TheLogo>

            <div class="form-section">
                <h2>{{ this.$i18n.t('views.home.passwordReset') }}</h2>
                <span class="subtitle">{{ this.$i18n.t('views.home.passwordResetText') }}</span>
            </div>

            <LandingInput
                :placeholder="usernamePH"
                :error="$v.username.$error"
                :icon="'user'"
                @update:value="username = $event"
            ></LandingInput>

            <div class="form-section">
                <input
                    class="confirm"
                    type="button"
                    :value="this.$i18n.t('views.home.send')"
                    @click="send()"
                />
                <input
                    class="subConfirm"
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
import TheLogo from '@/views/home/components/TheLogo'
import LandingInput from '@/components/LandingInput.vue'

export default {
    components: {
        TheLogo,
        LandingInput
    },
    data() {
        return {
            username: '',
            usernameFocused: false
        }
    },
    computed: {
        usernamePH: function() {
            return this.$t('views.home.nameOrEmail')
        }
    },
    methods: {
        send: function() {
            this.$v.$touch()
            if (!this.$v.$error) {
                this.$http
                    .post('/v1/auth/forgotPassword', {
                        usernameOrEmail: this.username
                    })
                    .then(({ error }) => {
                        if (error) {
                            //TODO: Output error
                            console.log(error)
                            return
                        }
                        this.$parent.login = 'pw_reset_success'
                    })
            }
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

<style src="@/assets/scss/components/LandingForm.scss" lang="scss" scoped></style>
