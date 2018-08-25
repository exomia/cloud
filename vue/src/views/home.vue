<template>
    <main>
        <div class="page-wrapper">
            <div class="header">
                <LangSwitcher/>
            </div>
            <div class="center">
                <form class="login-form">
                    <div class="form-section">
                        <LogoIcon class="logo" />
                        <h1>Exomia Cloud</h1>
                    </div>
                    <div class="form-section"
                         style="margin-top: 96px">
                        <div class="input-wrapper"
                             :class="{ 'input-wrapper-error': $v.username.$error }">
                            <UserIcon class="input-icon" />
                            <input type="text"
                                   @focus="usernameFocused = true"
                                   @blur="usernameFocused = false"
                                   :placeholder="[usernameFocused ? '' : usernamePH]">
                        </div>
                        <div class="input-wrapper"
                             :class="{ 'input-wrapper-error': $v.password.$error }">
                            <LockIcon class="input-icon" />
                            <input type="password"
                                   @focus="passwordFocused = true"
                                   @blur="passwordFocused = false"
                                   :placeholder="[passwordFocused ? '' : passwordPH]">
                        </div>
                    </div>
                    <div class="form-section">
                        <input class="signIn"
                               type="button"
                               :value="this.$i18n.t('index.form.signIn')"
                               @click="signIn()">
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
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import LangSwitcher from '@/components/UI/LangSwitcher.vue'

/* SVG */
import LogoIcon from '@/assets/img/icon/login/logo.svg'
import UserIcon from '@/assets/img/icon/login/user.svg'
import LockIcon from '@/assets/img/icon/login/lock.svg'

export default {
    head() {
        return {
            title: this.$t('title.home')
        }
    },
    data() {
        return {
            usernamePH: this.$t('index.form.nameOrEmail'),
            usernameFocused: false,
            passwordPH: this.$t('index.form.password'),
            passwordFocused: false
        }
    },
    components: {
        LogoIcon,
        UserIcon,
        LockIcon,
        LangSwitcher
    },
    methods: {
        signIn: function() {
            this.$v.$touch()

            if (!this.$v.$error) {
            } else {
                console.error('Input error')
            }
        }
    },
    validations: {
        username: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(64)
        },
        password: {
            required,
            minLength: minLength(4),
            maxLength: maxLength(72)
        }
    }
}
</script>


<style src="@/assets/css/pages/index" lang="scss" scoped></style>