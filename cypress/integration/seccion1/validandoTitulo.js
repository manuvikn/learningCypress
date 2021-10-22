/// <reference types="Cypress"/>

describe('Sección 2, Validando titulo', () => {

    it('Test validar el titulo', () => {
        cy.visit('https://demoqa.com/text-box');

        cy.title().should('eq', 'ToolsQA');

        cy.log('Okay');
    });

});