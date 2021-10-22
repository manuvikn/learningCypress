require('cypress-xpath');
describe('Sección dos Reto', () => {
    
    it('Primer test del reto de la sección Dos', () => {
        
        cy.visit('https://www.marca.com');

        cy.get('#didomi-notice-agree-button').as('aceptarPolitica').then((e)=> {
            cy.get('@aceptarPolitica').click();
        });

        cy.xpath('//header/div[5]/div[1]/ul[1]/li[16]/a[1]').as('madrid').should('be.visible').then((e)=>{
            cy.get('@madrid').click({force:true});
        });

    });

});