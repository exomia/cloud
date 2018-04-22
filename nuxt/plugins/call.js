import axios from 'axios'

async function get(ep, json) {
    let { data, headers } = await axios.get(`http://127.0.0.1:3001${ep}`)

    if (headers['x-token']) {
        //store the x-token in the localstorage
    }
    if (headers['x-refresh-token']) {
        //store the x-refresh-token in the localstorage
    }
    return data
}

export default {
    get
}
