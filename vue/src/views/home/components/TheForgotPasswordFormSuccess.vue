<template>
    <div class="center">
        <form>
            <TheLogo></TheLogo>

            <div class="form-section">
                <h2>{{ this.$i18n.t('views.home.passwordReset') }}</h2>
                <span class="subtitle">{{
                    this.$i18n.t('views.home.passwordResetSuccessText')
                }}</span>
            </div>

            <div class="form-section">
                <input
                    class="confirm"
                    type="button"
                    :value="this.$i18n.t('views.home.backToLogin')"
                    @click="$parent.login = 'login'"
                />

                <input class="subConfirm" style="visibility: hidden;" type="button" />
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

<style src="@/assets/scss/components/LandingForm.scss" lang="scss" scoped></style>
