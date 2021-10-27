require('cypress-xpath');

describe('Sección de pruebas y test de mi aplicativo', function() {

    before(() => {

        cy.visit('http://localhost:4200');

    })

    it('Primer test del aplicativo', () => {
        
        cy.log('Primer test de mi aplicativo');

        cy.xpath('/html/body/app-root/app-main/div/div').should('be.visible').children().each((element) => {
            console.log(element);

            expect(element.text().trim()).to.equal('hola');

        })


    });


})