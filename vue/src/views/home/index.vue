<template>
    <main>
        <div class="page-wrapper">
            <!-- Header -->
            <header><LangSwitcher /></header>
            <!-- Default form -->
            <TheLoginForm v-if="login === 'login'"></TheLoginForm>
            <!-- Forgot password step 1 -->
            <TheForgotPasswordForm
                v-if="login === 'pw_reset'"
            ></TheForgotPasswordForm>
            <!-- Forgot password step 2 -->
            <TheForgotPasswordFormSuccess
                v-if="login === 'pw_reset_success'"
            ></TheForgotPasswordFormSuccess>
            <!-- Footer -->
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
import TheFooter from '@/components/TheFooter'

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

<style src="@/views/home/index.scss" lang="scss" scoped></style>
