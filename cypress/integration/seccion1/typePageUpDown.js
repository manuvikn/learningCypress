describe('Type page up y type page down', () => {

    it('Titulo de esta nueva prueba con page up y page down', () => {
        
        cy.visit('https://demoqa.com/text-box');
        cy.title().should('eq', 'ToolsQA');

        cy.wait(1000);

        cy.get('#userName').type('{pagedown}');

    });

    it.only('Otra prueba repetida', () => {
        
        cy.visit('https://demoqa.com/text-box');
        cy.title().should('eq', 'ToolsQA');

        cy.wait(1000);

        cy.get('#userName').type('{pagedown}');

    });

});