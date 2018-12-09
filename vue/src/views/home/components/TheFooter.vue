<template>
    <footer>
        <div class="footer-section"><span>© 2018 Exomia.com</span></div>
        <div class="footer-section">
            <RouterLink :to="{ name: 'imprint' }" tag="a">
                <span>{{ $t('navigation.TheFooter.imprint') }}</span>
            </RouterLink>
            <RouterLink :to="{ name: 'privacy' }" tag="a">
                <span>{{ $t('navigation.TheFooter.privacy') }}</span>
            </RouterLink>
        </div>
    </footer>
</template>

<style src="@/views/home/components/TheFooter.scss" lang="scss" scoped></style>
