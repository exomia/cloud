export default async function({ $axios, redirect, route, app }) {
    const res = await $axios.get('/v1/auth')
    if (res.data.error) {
        if (route.path !== '/') {
            return redirect('/' + (app.i18n.locale === 'de' ? '' : app.i18n.locale))
        }
        return
    }

    if (route.path === '/' || route.path == '/' + app.i18n.locale) {
        return redirect(`/${app.i18n.locale === 'de' ? '' : app.i18n.locale + '/'}overview`)
    }

    // Optional: check for flags on specific sides / routes or whatever
}
