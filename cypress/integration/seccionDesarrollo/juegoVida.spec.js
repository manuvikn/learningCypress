import { Panel } from '../../models/panel';
import {generarPanelVisual, compararPaneles, comprobarClaseCeldas, clickCelda} from '../../models/utils/functions';

require('cypress-xpath');

describe('Banco de test para la aplicación "Juego de la vida"', function() {

    before(() => { // Hook before all

        cy.log('Visita a la página de desarrollo');
        cy.visit('http://localhost:4200');

    });

    after(() => { // Hook after all
        cy.log('Fin del flujo funcional de la aplicación');
    })


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

        cy.log('Todos los elementos visuales se encuentran presentes');
        
    });

    it('Prueba de funcionalidad botón "Siguiente turno" pt1', () => {
        
        // Se genera una matriz a partir del panel visual mostrado en el navegador
        const tablero = generarPanelVisual();
        const panel = new Panel(tablero);

        cy.xpath("//button[contains(text(),'Siguiente turno')]").should('be.visible')
        .and('have.text', 'Siguiente turno').as('next');

        // Se hace un "Siguiente turno" tanto en el componente visual como en el lógico
        cy.get('@next').click(); // Siguiente turno en el componente visual
        panel.nextTurn().then(() => this.panel = panel); // Siguiente turno en el componente lógico

        // Al haber hecho un siguiente turno la generación debe de haber pasado de 0 a 1
        cy.xpath('//p[contains(text(),"Generación")]').then(element => {
            const num = Number(element.text().split(': ')[1]);
            expect(num).to.equal(1);
        });

    });

    it('Prueba de funcionalidad botón "Siguiente turno" pt2', () => {
        
        // Se comparan ambos paneles para comprobar que la lógica funcione correctamente
        const tablero = generarPanelVisual();

        compararPaneles(tablero, this.panel.panel).then((iguales) => {
            expect(iguales).to.equal(true);
        });
        
        cy.log('Prueba funcionalidad botón "Siguiente turno" finalizada con éxito');
        
    });

    it('Prueba de funcionalidad botón "Cuadrícula"', () => {
        
        cy.xpath('//body/app-root[1]/app-main[1]/div[1]/app-partida[1]/div[1]/div[3]/button[3]')
        .should('be.visible').as('cuadricula');

        // Se comprueba que al iniciar partida las celdas no tengan cuadrícula
        // Al pulsar el botón se comprueba que esta vez si contengan esa cuadrícula
        comprobarClaseCeldas(0).then(claseCelda => {
            expect(claseCelda).to.equal(true);
            cy.get('@cuadricula').click();
            comprobarClaseCeldas(1).then(claseConBorde => {
                expect(claseConBorde).to.equal(true);
                cy.get('@cuadricula').click();
            });
        });

        cy.log('Prueba funcionalidad botón "Cuadrícula" finalizada con éxito');

    });

    it('Prueba de funcionalidad al pulsar en una de las celdas', () => {

        // Se comprueba que al pulsar celdas al azar su background-color cambia
        clickCelda();

    });

    it('Prueba de funcionalidad botón "Borrar partida"', () => {
        
        // Se comprueba que al pulsar el boton borrar partida, esta se elimine
        cy.xpath('//body/app-root[1]/app-main[1]/div[1]/app-partida[1]/div[1]/div[3]/button[4]')
        .should('be.visible').as('borrar').click();

        cy.xpath('//body/app-root[1]/app-main[1]/div[1]/div[1]')
        .children().eq(0).should('have.text', 'No tienes ninguna partida');

    });
    

});