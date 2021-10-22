describe('Bienvenido al curso de cypress modulo 1', () => {

    it('Mi primer test', () => {
        cy.log('hola mundo');
        cy.wait(1000);
    });

    it('Segundo test, campo name', () => {
        
        cy.visit('https://demoqa.com/text-box');
        cy.get('#userName').type('Manuel Victoria');
        cy.wait(5000);

    });

});