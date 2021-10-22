require('cypress-plugin-tab');

describe('Primer desafío de la sección', () => {

    it('Primer test del desafío', () => {
        cy.visit('https://demoqa.com/webtables');
        cy.get('#addNewRecordButton').should('be.visible').click();
        cy.get('#firstName').should('be.visible').type('Manuel')
        .tab().should('be.visible').type('Victoria Sanmartín')
        .tab().should('be.visible').type('manuelvictoriacode@gmail.com')
        .tab().should('be.visible').type('20')
        .tab().should('be.visible').type('21000')
        .tab().should('be.visible').type('Desarrollo Software')

        cy.get('#submit').should('be.visible').click();


        cy.get('#searchBox').should('be.visible').as('search')
        .type('manuel');
        cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(7)').should('be.visible').get('span[title="Delete"]').click();

        cy.get('@search').clear();
    });
    
});