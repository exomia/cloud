export default async ({ store: { commit }, redirect, http }) => {
    const { data } = await http.get("/v1/auth")
    if (!data.error) {
        commit("setUserInfo", data)
    } else {
        redirect("/")
        //error('Forbidden', 403);
    }
}
