<template>
    <main>
        <div class="page-wrapper">
            <!-- Header -->
            <header><LangSwitcher /></header>
            <!-- Default form -->
            <TheResetPasswordForm></TheResetPasswordForm>
            <!-- Footer -->
            <TheFooter></TheFooter>
        </div>
    </main>
</template>

<script>
/* Components */
import LangSwitcher from '@/components/LangSwitcher.vue'
import TheResetPasswordForm from '@/views/resetPassword/components/TheResetPasswordForm'
import TheFooter from '@/components/TheFooter'

export default {
    components: {
        LangSwitcher,
        TheFooter,
        TheResetPasswordForm
    },
    data() {
        return {
            token: this.$route.params.token
        }
    },
    metaInfo() {
        return {
            title: this.$t('title.resetPassword')
        }
    }
}
</script>

<style src="@/assets/scss/views/home.scss" lang="scss" scoped></style>
