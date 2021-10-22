require('cypress-plugin-tab');

describe('Funcion tab', ()=> {

    it('Primera prueba con la funcion tab', () => {
        cy.visit('https://demoqa.com/text-box');
        cy.title().should('eq', 'ToolsQA');
        cy.wait(1000);

        cy.get('#userName').type('Manuel').tab().type('Victoria Sanmartín').tab().type('manuelvictoriacode@gmail.com');


    });

});