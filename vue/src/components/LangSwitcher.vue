<template>
    <a @click="switchLang()">
        <AmericanFlag v-if="$i18n.locale === 'en'" class="flag" />
        <GermanFlag v-if="$i18n.locale === 'de'" class="flag" />
        <span class="lang">{{ upperLang }}</span>
    </a>
</template>

<script>
/* SVG */
import AmericanFlag from '@/assets/img/icon/american_flag.svg'
import GermanFlag from '@/assets/img/icon/german_flag.svg'

export default {
    components: {
        AmericanFlag,
        GermanFlag
    },
    data() {
        return {
            langs: ['de', 'en']
        }
    },
    computed: {
        upperLang: function() {
            return this.$i18n.locale.toUpperCase()
        }
    },
    methods: {
        switchLang: function() {
            /* Lock context */
            const self = this

            const idx = self.langs.findIndex(function(el) {
                return el === self.$i18n.locale
            })

            /* Dont continue if only one language is given */
            if (self.langs.length <= 1) return

            if (idx + 1 < self.langs.length) {
                self.$i18n.locale = self.langs[idx + 1]
            } else {
                self.$i18n.locale = self.langs[0]
            }
        }
    }
}
</script>

<style src="@/assets/scss/components/LangSwitcher.scss" lang="scss" scoped></style>
