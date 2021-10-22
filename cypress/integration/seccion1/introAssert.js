describe("Intro Assert Modulo", () => {

    it('Test de los asserts', () => {
        cy.visit('https://demoqa.com/text-box');

        cy.get('#userName').should('be.visible').type('Es visible');
    });

});