<template>
    <main>
        <div class="page-wrapper">
            <header><LangSwitcher /></header>

            <TheLoginForm v-show="login === 'login'"></TheLoginForm>
            <TheForgotPasswordForm
                v-show="login === 'pw_reset'"
            ></TheForgotPasswordForm>
            <TheForgotPasswordFormSuccess
                v-show="login === 'pw_reset_success'"
            ></TheForgotPasswordFormSuccess>
            <TheFooter></TheFooter>
        </div>
    </main>
</template>

<script>
/* Components */
import LangSwitcher from '@/components/LangSwitcher.vue'
import TheLoginForm from '@/views/home/components/TheLoginForm'
import TheForgotPasswordForm from '@/views/home/components/TheForgotPasswordForm'
import TheForgotPasswordFormSuccess from '@/views/home/components/TheForgotPasswordFormSuccess'
import TheFooter from '@/views/home/components/TheFooter'

export default {
    components: {
        LangSwitcher,
        TheFooter,
        TheLoginForm,
        TheForgotPasswordForm,
        TheForgotPasswordFormSuccess
    },
    data() {
        return {
            login: 'login'
        }
    },
    metaInfo() {
        return {
            title: this.$t('title.home')
        }
    }
}
</script>

<style src="@/assets/scss/views/home.scss" lang="scss" scoped></style>
