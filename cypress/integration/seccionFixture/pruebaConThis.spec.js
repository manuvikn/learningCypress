describe('Conjunto de test de mi aplicativo', function() {

    before(() => {

        cy.visit('https://google.com');
        
    });
    

    it('Primer test del aplicativo', async () =>{

        const promise = new Promise((resolve) => {

            fetch('https://random-data-api.com/api/coffee/random_coffee?size=2', {
                method: 'GET'
            })
            .then(data => data.json())
            .then(data => {
                resolve(data);
            })
            .catch(err => new Error(err));

        });
        
        const arrData = await promise;
        this.arrData = arrData;
    });


    it('Segundo test del aplicativo', () => {
        
        cy.get('#L2AGLb > .jyfHyd').click({force: true});
        this.arrData.forEach((coffeeItem, index) => {
            
            cy.visit('https://google.com');
            cy.get('.gLFyf').should('be.enabled').as('inputSearch');
            cy.get('@inputSearch').type('Hola mundo por ' + index + ' vez.');
            cy.get('@inputSearch').clear();
            cy.get('@inputSearch').type(coffeeItem['blend_name'] + '{enter}');
            console.log(coffeeItem);
        });

    });


});