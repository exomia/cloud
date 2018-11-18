export default async ({ store, redirect }) => {
    if (!store.getters.isAuthenticated) {
        redirect("/");
        //error('Forbidden', 403);
    }
}