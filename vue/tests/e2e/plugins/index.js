// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

// const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
    // const options = webpack.defaultOptions
    // options.webpackOptions.module.rules[0].use[0].options.presets.push(
    //     '@babel/preset-es2015'
    // )
    // on('file:preprocessor', webpack(options))

    return Object.assign({}, config, {
        fixturesFolder: 'tests/e2e/fixtures',
        integrationFolder: 'tests/e2e/specs',
        screenshotsFolder: 'tests/e2e/screenshots',
        videosFolder: 'tests/e2e/videos',
        supportFile: 'tests/e2e/support/index.js'
    })
}
