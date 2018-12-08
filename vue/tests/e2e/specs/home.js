// https://docs.cypress.io/api/introduction/api.html
// https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Cypress-Is-Simple

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
        //Buttons
        cy.get('input[type="text"]')
        cy.get('input[type="password"]')
        cy.get('input[class="signIn"]')
        cy.get('input[class="forgotPw"]')
    })

    it('Language change test', () => {
        //Language Tests
        //German
        cy.contains('span', '©')
        cy.contains('span', 'Impressum')
        cy.contains('span', 'Datenschutz')
        cy.get('input[class="signIn"]').should('have.value', 'Anmelden')
        cy.get('input[class="forgotPw"]').should(
            'have.value',
            'Passwort vergessen?'
        )
        cy.get('span.lang').click()
        //English
        cy.contains('span', 'Imprint')
        cy.contains('span', 'Privacy')
        cy.get('input[class="signIn"]').should('have.value', 'Sign in')
        cy.get('input[class="forgotPw"]').should(
            'have.value',
            'Forgot password?'
        )
    })

    it('Check Login', () => {
        //Login
        cy.get('input[type="text"]').type('admin')
        cy.get('input[type="password"]').type('1234')
        cy.get('input[class="signIn"]').click()
        cy.url().should('include', '/overview')
    })
})
