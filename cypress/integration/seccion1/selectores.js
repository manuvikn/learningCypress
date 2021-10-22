require('cypress-xpath');

describe('Pruebas con selectores', () => {

    it('Test con xpath', () => {
        
        cy.visit('https://demoqa.com/text-box');
        cy.title().should('eq', 'ToolsQA');
        cy.xpath("//input[@id='userName']").should('be.visible').type('Path extraido con ChroPath');

    });


    it('Selectores con contains', () => {
        
        cy.visit('https://demoqa.com/radio-button');
        cy.title().should('eq', 'ToolsQA');
        cy.get('.custom-control-label').contains('Yes').should('be.visible').click();
    });


    it.only('Visita a google', () => {
        
        cy.visit('https://google.com');
        cy.get('#L2AGLb > .jyfHyd').click();
        cy.get('.gLFyf').should('be.visible').type('Manuel Victoria Sanmartín');
        cy.get('.goxjub').should('be.visible').click();

    });

});