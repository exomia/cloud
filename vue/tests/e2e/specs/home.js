// https://docs.cypress.io/api/introduction/api.html
// https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Is-Simple

// Cypress.on('uncaught:exception', (err, runnable) => {
//     // returning false here prevents Cypress from
//     // failing the test
//     return false
// })

// // this would be the last step
// cy.getConsoleLog().should(function(log) {
//     console.log(log)
//     // log = [['warn', 'warning message'], ['log', 'regular log message'] ['warn', 'another warning message']]
//     // check that log does not contain any 'warn' or 'error' entry
//     const disallowedLevels = new Set(['warn', 'error'])
//     expect(log.some(([level]) => disallowedLevels.has(level)).false)
// })

/* Mount vue */
require('cypress-vue-unit-test')

describe('Home', () => {
    it('Visits the app root url', () => {
        cy.visit('/')
    })

    it('Check if Page loaded correctly', () => {
        cy.get('#app')
        cy.get('span.lang')
        cy.get('form.login-form')
        cy.contains('h1', 'Exomia Cloud')
        cy.get('svg') // Check if Logo is there
        // Buttons
        cy.get('input[type="text"]')
        cy.get('input[type="password"]')
        cy.get('input[class="confirm"]')
        cy.get('input[class="subConfirm"]')
    })

    it('Language change test', () => {
        // Language Tests
        // English
        cy.contains('span', 'Imprint')
        cy.contains('span', 'Privacy')
        cy.get('input[class="confirm"]').should('have.value', 'Sign in')
        cy.get('input[class="subConfirm"]').should(
            'have.value',
            'Forgot password?'
        )
        cy.get('span.lang').click()
        // German
        cy.contains('span', '©')
        cy.contains('span', 'Impressum')
        cy.contains('span', 'Datenschutz')
        cy.get('input[class="confirm"]').should('have.value', 'Anmelden')
        cy.get('input[class="subConfirm"]').should(
            'have.value',
            'Passwort vergessen ?'
        )
    })

    it('Check Login', () => {
        // Login
        cy.get('input[type="text"]').type('admin')
        cy.get('input[type="password"]').type('1234')
        cy.get('input[class="confirm"]').click()
        cy.url().should('include', '/overview')
    })
})
