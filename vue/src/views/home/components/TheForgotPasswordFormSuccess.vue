<template>
    <div class="center">
        <form>
            <TheLogo></TheLogo>

            <div class="form-section" style="margin-top: 35px">
                <h2>{{ this.$i18n.t('views.home.passwordReset') }}</h2>
            </div>

            <div class="form-section" style="margin-top: 35px">
                <h3>
                    {{ this.$i18n.t('views.home.passwordResetSuccessText') }}
                </h3>
            </div>

            <div class="form-section" style="margin-top: 98px">
                <input
                    class="confirm"
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
import TheLogo from '@/views/home/components/TheLogo'

export default {
    components: {
        TheLogo
    }
}
</script>

<style
    src="@/assets/scss/components/LandingForm.scss"
    lang="scss"
    scoped
></style>
