export default async function({ route, store }) {
    if (route.name.startsWith('overview-dir')) {
        await store.dispatch('setDirectories', route.params.dir || '')
    }
}
