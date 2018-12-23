<template>
    <a @click="switchLang()">
        <FlagEN v-if="$i18n.locale === 'en'" class="flag" />
        <FlagDE v-if="$i18n.locale === 'de'" class="flag" />
        <span class="lang">{{ upperLang }}</span>
    </a>
</template>

<script>
/* SVG */
import FlagEN from '@/assets/img/icon/login/lang_en.svg'
import FlagDE from '@/assets/img/icon/login/lang_de.svg'

export default {
    components: {
        FlagEN,
        FlagDE
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
