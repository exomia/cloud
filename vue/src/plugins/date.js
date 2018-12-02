import Vue from "vue"

const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
}

Vue.filter("toDatetime", value => {
    return new Date(value).toLocaleDateString("de-DE", options)
})

export function pad(num, size) {
    let a = num + ""
    while (a.length < size) {
        a = "0" + a
    }
    return a
}
