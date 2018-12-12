<template>
    <footer>
        <div class="footer-section"><span>© 2018 Exomia.com</span></div>
        <div class="footer-section">
            <RouterLink :to="{ name: 'imprint' }" tag="a">
                <span>{{ $t('title.imprint') }}</span>
            </RouterLink>
            <RouterLink :to="{ name: 'privacy' }" tag="a">
                <span>{{ $t('title.privacy') }}</span>
            </RouterLink>
        </div>
    </footer>
</template>

<style src="@/assets/scss/components/TheFooter.scss" lang="scss" scoped></style>
