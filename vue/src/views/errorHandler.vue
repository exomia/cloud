<template>
    <main>
        <h1>Error - {{ $errorHandler.error.statusCode }}</h1>
        <br>
        <p>{{ $errorHandler.error.message }}</p>
        <!-- <a v-if="!haveHistory" href="/" class="button" @click.prevent="gotoHome">Go to home</a>
        <a v-else href="#" class="button" @click.prevent="$router.back()">Go back</a>-->
        <pre v-if="$errorHandler.error && !isProduction">{{ $errorHandler.error.stack || $errorHandler.error }}</pre>
    </main>
</template>

<script>
export default {
    metaInfo() {
        return {
            title: this.$t('title.error')
        }
    },
    props: {
        code: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        isProduction: process.prod
    }),
    computed: {
        // current() {
        //     return this.$store.state.errorHandler
        // },
        error() {
            if (this.current && this.current.error) return this.current.error
            return null
        }
        // haveHistory() {
        //     return process.client && window.history.length > 0
        // }
    }
    // mounted() {
    //     console.log(this.$errorHandler.error)
    // }
    // methods: {
    //     gotoHome() {
    //         this.$store.commit("errorHandler/CLEAR")
    //         if (this.$router.currentRoute.path !== "/") {
    //             this.$router.replace("/")
    //         }
    //     }
    // }
}
</script>
