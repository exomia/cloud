import Vue from 'vue'

Vue.filter('toDatetime', value => {
    const d = new Date(value)
    return `${pad(d.getDate(), 2)}.${pad(
        d.getMonth() + 1,
        2
    )}.${d.getFullYear()}`
})

export function pad(num, size) {
    let a = num + ''
    for (; a.length < size; ) {
        a = '0' + a
    }
    return a
}
