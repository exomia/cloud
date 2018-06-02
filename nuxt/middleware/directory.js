export default async function({ route, store }) {
    if (route.name === 'overview-dir') {
        await store.dispatch('setDirectories', route.params.dir || '')
    }
}
