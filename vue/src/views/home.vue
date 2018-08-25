<template>
    <main>
        <div class="page-wrapper">
            <div class="header">
                <a @click="switchLang()">
                    <div class="flag"
                         :class="$i18n.locale"></div>
                    <span class="lang">{{upperLang}}</span>
                </a>
            </div>
            <div class="center">
                <form class="login-form">
                    <div class="form-section">
                        <img src="@/assets/img/icon/login/logo.svg"
                             alt="Logo"
                             class="logo">
                        <h1>Exomia Cloud</h1>
                    </div>
                    <div class="form-section"
                         style="margin-top: 96px">
                        <div class="input-wrapper">
                            <img class="input-icon"
                                 src="@/assets/img/icon/login/user.svg"
                                 alt="User">
                            <input type="text"
                                   @focus="usernameFocused = true"
                                   @blur="usernameFocused = false"
                                   :placeholder="[usernameFocused ? '' : usernamePH]">
                        </div>
                        <div class="input-wrapper">
                            <img class="input-icon"
                                 src="@/assets/img/icon/login/lock.svg"
                                 alt="Password">
                            <input type="password"
                                   @focus="passwordFocused = true"
                                   @blur="passwordFocused = false"
                                   :placeholder="[passwordFocused ? '' : passwordPH]">
                        </div>
                    </div>
                    <div class="form-section">
                        <input class="signIn"
                               type="button"
                               :value="this.$i18n.t('index.form.signIn')">
                        <input class="forgotPw"
                               type="button"
                               :value="this.$i18n.t('index.form.forgotPassword')">
                    </div>
                </form>
            </div>
            <div class="footer">
                <div class="footer-section">
                    <span>© 2018 Exomia.com</span>
                </div>
                <div class="footer-section">
                    <a>
                        <span>{{$t('navigation.TheFooter.imprint')}}</span>
                    </a>
                    <a>
                        <span>{{$t('navigation.TheFooter.privacy')}}</span>
                    </a>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            langs: ['de', 'en'],
            usernamePH: this.$t('index.form.nameOrEmail'),
            usernameFocused: false,
            passwordPH: this.$t('index.form.password'),
            passwordFocused: false
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


<style src="@/assets/css/pages/index" lang="scss" scoped></style>