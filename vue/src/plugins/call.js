import Vue from 'vue'

Vue.mixin({
    methods: {
        call: async (url, data = {}, method = 'POST') =>
            await fetch(`${process.env.VUE_APP_API_URL}${url}`, {
                method,
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .catch(err => {
                    console.error(err)
                })
    }
})
