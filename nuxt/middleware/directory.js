export default async function({ route, store }) {
    await store.dispatch('setDirectoryData', route.params.dir)
}
