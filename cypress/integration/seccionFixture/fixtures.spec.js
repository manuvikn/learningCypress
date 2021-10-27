describe('Probando los fixtures', function() {

    before(function() {
        
        cy.log('hola mundo');
        cy.fixture('example').then(function (data){

            cy.log(JSON.stringify(data));

            console.log(data);
            this.data = data;
            console.log(this.data);

            console.log('Global this');
            console.log(globalThis);

        });

    });
    

    it('Test probando los fixtures', () =>{
        
        console.log(this);
        cy.log('dentro del primer test');
        // cy.log(this.data['name']);

        console.log('Global this dentro del primer test con funcion flecha');
        console.log(globalThis);


    });


});