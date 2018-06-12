export const I18N = {
    locales: [
        {
            code: 'en',
            iso: 'en-US',
            name: 'English',
            file: 'en.js'
        },
        {
            code: 'de',
            iso: 'de-DE',
            name: 'German',
            file: 'de.js'
        }
    ],
    detectBrowserLanguage: {
        useCookie: false,
        cookieKey: 'i18n_redirected'
    },
    defaultLocale: 'en',
    lazy: true,
    langDir: 'i18n/translations/',
    vueI18n: {
        fallbackLocale: 'en'
    }
}
