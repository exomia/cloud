export default async function({ $axios, redirect, route, app }) {
    const l = app.i18n.locale === 'de' ? '/' : '/' + app.i18n.locale
    const res = await $axios.get('/v1/auth')
    if (res.data.error) {
        if (route.path !== l) {
            return redirect(l)
        }
        return
    }

    if (route.path === l) {
        return redirect(`/${app.i18n.locale === 'de' ? '' : app.i18n.locale + '/'}overview`)
    }

    // Optional: check for flags on specific sides / routes or whatever
}
