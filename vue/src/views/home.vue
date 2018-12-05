<template>
    <main>
        <div class="page-wrapper">
            <div class="header">
                <LangSwitcher/>
            </div>
            <div class="center">
                <form class="login-form">
                    <div class="form-section">
                        <LogoIcon class="logo"/>
                        <h1>Exomia Cloud</h1>
                    </div>
                    <div class="form-section" style="margin-top: 96px">
                        <div
                            class="input-wrapper"
                            :class="{ 'input-wrapper-error': $v.username.$error }"
                        >
                            <div class="icon-wrapper">
                                <UserIcon class="input-icon"/>
                            </div>
                            <input
                                v-model="username"
                                type="text"
                                :placeholder="[usernameFocused ? '' : usernamePH]"
                                @focus="usernameFocused = true"
                                @blur="usernameFocused = false"
                                @keydown.enter="signIn()"
                            >
                        </div>
                        <div
                            class="input-wrapper"
                            :class="{ 'input-wrapper-error': $v.password.$error }"
                        >
                            <div class="icon-wrapper">
                                <LockIcon class="input-icon"/>
                            </div>
                            <input
                                v-model="password"
                                type="password"
                                :placeholder="[passwordFocused ? '' : passwordPH]"
                                @focus="passwordFocused = true"
                                @blur="passwordFocused = false"
                                @keydown.enter="signIn()"
                            >
                        </div>
                    </div>
                    <div class="form-section">
                        <input
                            class="signIn"
                            type="button"
                            :value="this.$i18n.t('index.form.signIn')"
                            @click="signIn()"
                        >
                        <input
                            class="forgotPw"
                            type="button"
                            :value="this.$i18n.t('index.form.forgotPassword')"
                        >
                    </div>
                </form>
            </div>
            <div class="footer">
                <div class="footer-section">
                    <span>© 2018 Exomia.com</span>
                </div>
                <div class="footer-section">
                    <RouterLink :to="{ name: 'imprint' }" tag="a">
                        <span>{{$t('navigation.TheFooter.imprint')}}</span>
                    </RouterLink>
                    <RouterLink :to="{ name: 'privacy' }" tag="a">
                        <span>{{$t('navigation.TheFooter.privacy')}}</span>
                    </RouterLink>
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
//
import authRedirect from '@/middlewares/authRedirect'

export default {
    middlewares: [authRedirect],
    metaInfo() {
        return {
            title: this.$t('title.home')
        }
    },
    components: {
        LogoIcon,
        UserIcon,
        LockIcon,
        LangSwitcher
    },
    data() {
        return {
            username: '',
            usernamePH: this.$t('index.form.nameOrEmail'),
            usernameFocused: false,
            password: '',
            passwordPH: this.$t('index.form.password'),
            passwordFocused: false
        }
    },
    methods: {
        signIn: async function() {
            this.$v.$touch()
            if (!this.$v.$error) {
                this.$http
                    .post('/v1/auth/login', {
                        username: this.username,
                        password: this.password
                    })
                    .then(({ data, error }) => {
                        if (!error) {
                            this.$store.commit('setUserInfo', data)
                            this.$router.push({ name: 'overview-dir' })
                        }
                    })
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

<style src="@/assets/css/pages/home" lang="scss" scoped>
</style>
