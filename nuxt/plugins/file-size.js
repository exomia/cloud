import Vue from 'vue'

const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

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
