<template>
    <main>
        <div class="page-wrapper">
            <header>
                <LangSwitcher/>
            </header>
            <TheLoginForm></TheLoginForm>
            <TheFooter></TheFooter>
        </div>
    </main>
</template>

<script>
/* Components */
import LangSwitcher from '@/components/LangSwitcher.vue'
import TheLoginForm from '@/views/home/components/TheLoginForm'
import TheFooter from '@/views/home/components/TheFooter'

export default {
    metaInfo() {
        return {
            title: this.$t('title.home')
        }
    },
    components: {
        LangSwitcher,
        TheFooter,
        TheLoginForm
    }
}
</script>

<style src="@/assets/scss/views/home.scss" lang="scss" scoped></style>
