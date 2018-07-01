export default async function({ route, store }) {
    if (route.name.startsWith('overview-dir')) {
        console.log('get data')
        await store.dispatch('setDirectoryData', route.params.dir)
    }
}
