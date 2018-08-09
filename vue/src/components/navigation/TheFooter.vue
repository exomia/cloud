<template>
    <footer>
        <div>
            <router-link :to="{ name: 'imprint' }"
                         tag="a"
                         class="footer-button">{{$t('navigation.TheFooter.imprint')}}</router-link>
            <router-link :to="{ name: 'privacy' }"
                         tag="a"
                         class="footer-button">{{$t('navigation.TheFooter.privacy')}}</router-link>
        </div>
        <span class="copyright">© 2018 exomia.com</span>
    </footer>
</template>

<style src="@/assets/css/components/navigation/TheFooter" lang="scss" scoped>
</style>
