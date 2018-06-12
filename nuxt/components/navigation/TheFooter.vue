<template>
    <footer>
        <div>
            <nuxt-link :to="localePath('imprint')"
                       tag="a"
                       class="footer-button">Impressum</nuxt-link>
            <nuxt-link :to="localePath('privacypolicy')"
                       tag="a"
                       class="footer-button">Datenschutz</nuxt-link>
        </div>
        <span class="copyright">© 2018 exomia.com</span>
    </footer>
</template>

<style src="~/assets/css/components/navigation/TheFooter.scss" lang="scss" scoped>
</style>
