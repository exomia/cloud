module.exports = {
    root: true,
    env: {
        node: true,
        'cypress/globals': true
    },
    extends: [
        'plugin:cypress/recommended',
        'plugin:vue/recommended',
        '@vue/prettier',
        'plugin:css-modules/recommended'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    },
    plugins: ['cypress', 'css-modules'],
    parserOptions: {
        parser: 'babel-eslint',
        ecmaVersion: 2019,
        sourceType: 'module'
    }
}
