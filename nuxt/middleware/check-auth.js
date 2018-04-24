export default function(context) {
    context.store.dispatch('checkAuth', context)
}
