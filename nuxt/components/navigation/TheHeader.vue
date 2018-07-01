<template>
    <header class="space-between">
        <nuxt-link :to="localePath('overview-dir')"
                   tag="a"
                   class="button">
            <img class="logo"
                 src="~/assets/img/cloud-logo.svg"
                 alt="Exomia Cloud">
        </nuxt-link>
        <div>
            <nuxt-link v-for="locale in $i18n.locales"
                       v-if="locale.code !== $i18n.locale"
                       :key="locale.code"
                       :to="switchLocalePath(locale.code)"
                       class="lang"
                       :class="'lang-' + locale.code"
                       tag="a"></nuxt-link>
            <i @click="logout()"
               class="logout"></i>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            title: process.env.PROJECT_TITLE
        }
    },
    methods: {
        logout() {
            /* Clear tokens */
            delete_cookie('x-refresh-token-c')
            delete_cookie('x-token-c')

            /* Clear Local/-Sessionstorage */
            localStorage.clear()
            sessionStorage.clear()

            /* Redirect to login page */
            this.$nextTick(() => {
                $nuxt.$router.push({
                    name: `index___${this.$i18n.locale}`
                })
            })
        }
    },
    props: {
        isAuthenticated: {
            type: Boolean,
            default: false
        }
    }
}

function delete_cookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`
}
</script>

<style src="~/assets/css/components/navigation/TheHeader.scss" lang="scss" scoped>
</style>
