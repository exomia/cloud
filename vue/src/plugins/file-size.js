import Vue from 'vue'

const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

Vue.filter('toUnit', value => {
    let i = 0
    for (; i < units.length; i++) {
        if (value < 1024) {
            break
        }
        value /= 1024
    }
    return (
        Number(value)
            .toFixed(value < 10 ? 2 : value < 100 ? 1 : 0)
            .toString() +
        ' ' +
        units[i]
    )
})

Vue.filter('toUnitNoSuffix', value => {
    let i = 0
    for (; i < units.length; i++) {
        if (value < 1024) {
            break
        }
        value /= 1024
    }
    return Number(value)
        .toFixed(value < 10 ? 2 : value < 100 ? 1 : 0)
        .toString()
})
