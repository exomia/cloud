<template>
    <footer>
        <div>
            <nuxt-link :to="localePath('imprint')"
                       tag="a"
                       class="footer-button">{{$t('navigation.TheFooter.imprint')}}</nuxt-link>
            <nuxt-link :to="localePath('privacy')"
                       tag="a"
                       class="footer-button">{{$t('navigation.TheFooter.privacy')}}</nuxt-link>
        </div>
        <span class="copyright">© 2018 exomia.com</span>
    </footer>
</template>

<style src="~/assets/css/components/navigation/TheFooter.scss" lang="scss" scoped>
</style>
