const { Panel } = require('../../models/panel');
const { generarPanelVisual } = require('../../models/utils/functions');

require('cypress-xpath');

describe('Banco de test para la aplicación "Juego de la vida"', function() {

    before(() => { // Hook before all

        cy.log('Visita a la página de desarrollo');
        cy.visit('http://localhost:4200');

    });


    it('Verificación de titulo y que no existan partidas', () => {
        
        cy.title().should('eq', 'JuegoVida');
        cy.xpath('/html/body/app-root/app-main/div/div[1]').should('be.visible');
        cy.log('Titulo y número de partidas verificado con éxito');
        
        // Se verifica el titulo de la página y que al cargar no haya ninguna partida
    });


    it('Creación de primera partida y verificación de botones y datos visibles', () => {

        cy.xpath('//body/app-root[1]/app-main[1]/div[1]/div[2]/button[1]').as('addGame')
        .should('be.visible').click();
        cy.log('Partida de prueba creada');

        // Verificamos que al pulsar en añadir partida, esta se genere
        cy.xpath('//body/app-root[1]/app-main[1]/div[1]/app-partida[1]/div[1]').as('partida')
        .should('be.visible');

        // Verificamos que la partida contiene los tres elementos principales
        // El div panel, el div de datos ( generacion... ), el div de la botonera 
        cy.get('@partida').children().should('have.length', 3);
        
        // Verificamos que la partida comience a 0 de generación
        cy.get('@partida').children().eq(1).children().then(generacion => {
            expect(generacion.text()).to.equal('Generación: 0');
        });

        // Verificamos que la botonera cuente con los cuatro botones principales
        cy.get('@partida').children().eq(2).children().then(botonera => {
            expect(botonera.length).to.equal(4);
        });
        
    });

    it('Prueba de funcionalidad botón "Siguiente turno" pt1', () => {
        
        const tablero = generarPanelVisual();
        const panel = new Panel(tablero);

        cy.xpath("//button[contains(text(),'Siguiente turno')]").should('be.visible')
        .and('have.text', 'Siguiente turno').as('next');

        cy.get('@next').click();

        panel.nextTurn().then(() => this.panel = panel);

    });

    it('Prueba de funcionalidad botón "Siguiente turno" pt2', () => {
        
        const tablero = generarPanelVisual();
        console.log(tablero);
        console.log('************************************************');
        console.log(this.panel);
        
    });

    /* it('Generación de panel visual extraido del panel lógico (Angular)', () => {
        
        this.panel = new Panel(generarPanelVisual());

        cy.xpath("//button[contains(text(),'Siguiente turno')]").should('be.visible')
        .and('have.text', 'Siguiente turno').as('next');

        cy.get('@next').click();

    }); */

});