describe("Funciones al pulsar enter" , ()=> {


    it('Type enter', () => {
        cy.visit('https://www.google.com');

        cy.title('Google').should('eq', 'Google');
        cy.get('#L2AGLb').click();
        cy.get('[name="q"]').type('marca').type('{enter}');
        cy.contains('MARCA').click();
        // cy.get('#rso > div:nth-child(1) > div > div > div > div > div > div.yuRUbf > a').click();
    });

});