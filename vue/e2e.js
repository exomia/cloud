const exec = require('child_process').exec
const vueCliPath = require.resolve('@vue/cli-service/bin/vue-cli-service.js')
const cfg = require(require.resolve('./src/.config/.cypress.config.json'))
const cmd = `${vueCliPath} test:e2e --headless --record --key ${cfg.key}`

exec(cmd, (error, stdout, stderr) => {
    console.log(`\n${stdout}\n`)
    // console.log(`\n${stderr}\n`)
    // if (error) {
    //     console.error(`\n${error}\n`)
    // }
})
