require('cypress-plugin-tab');

describe("Opciones click", () => {

    it('Test de las opciones de click', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.title().should('eq', 'OrangeHRM');
        cy.get('#txtUsername').should('be.visible').type('admin').tab().should('be.visible').type('admin123');
        cy.get('#btnLogin').should('be.visible').click();

        cy.get('#menu_pim_viewMyDetails > b').should('be.visible').click();
        cy.get('#sidenav > :nth-child(6) > a').should('be.visible').click();
    });

    it.only('Test probando el click forzado', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/');
        cy.title().should('eq', 'OrangeHRM');
        cy.get('#txtUsername').should('be.visible').type('admin').tab().should('be.visible').type('admin123');
        cy.get('#btnLogin').should('be.visible').click();

        cy.get('#menu_pim_viewMyDetails > b').should('be.visible').click();
        cy.get('#sidenav > :nth-child(6) > a').should('be.visible').click({force:true});
    });


});