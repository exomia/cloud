<template>
    <div id="footer">
        <div>
            <nuxt-link :to="{ name: 'imprint' }" tag="a" class="footer-button">Impressum</nuxt-link>
            <nuxt-link :to="{ name: 'privacypolicy' }" tag="a" class="footer-button">Datenschutz</nuxt-link>
        </div>
        <span class="copyright">© 2018 exomia.com</span>
    </div>
</template>

<style src="~/assets/css/components/navigation/TheFooter.scss" lang="scss" scoped />
