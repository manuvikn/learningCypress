export function generarPanelVisual() {
    
    cy.xpath('//body/app-root[1]/app-main[1]/div[1]/app-partida[1]/div[1]/div[1]').as('panel')
    .should('be.visible');
    
    const panel = [];
    
    cy.get('@panel').children().each(fila => {
    
        const columnsArr = fila.children();
        const filas = [];
        
        for (let i = 0; i < columnsArr.length; i++) {
            let celValue = Number(columnsArr[i].getAttribute('ng-reflect-valor-celda'));
            filas.push(celValue);    
        }
    
        panel.push(filas);
    
    });
    
    return panel;
}

export function comprobarClaseCeldas(opt) {

    return new Promise((resolve) => {
        const clases = [ 'celda', 'celda conBorde']
        
        cy.xpath('//body/app-root[1]/app-main[1]/div[1]/app-partida[1]/div[1]/div[1]').as('panel')
        .should('be.visible');
        
        cy.get('@panel').children().each(fila => {
        
            const columnsArr = fila.children();
            
            for (let i = 0; i < columnsArr.length; i++) {
                if (columnsArr[i].className !== clases[opt]) {
                    resolve(false);
                }
            }
            resolve(true);
        
        });

    });


}

export function clickCelda() {

    for (let i = 0; i < 5; i++) {
        
        let fila = Math.round(Math.random() * 49);
        let col = Math.round(Math.random() * 159);
        let colorAfter;
        let colorBefore;
    
        cy.xpath('//body/app-root[1]/app-main[1]/div[1]/app-partida[1]/div[1]/div[1]')
        .should('be.visible').children().eq(fila).as('fila');
    
        cy.get('@fila').children().eq(col).then(elAfter => {
            colorAfter = elAfter.css('background-color');
        }).click().then(() => {
            cy.get('@fila').children().eq(col).then(elBefore => {
                colorBefore = elBefore.css('background-color');
                
                expect(colorAfter).to.not.equal(colorBefore);
    
            });
        });

    }


}

export const compararPaneles = (tablero, panel) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            for (let i = 0; i < tablero.length; i++) {
                for (let j = 0; j < tablero[i].length; j++) {
                    if (tablero[i][j] !== panel[i][j]) {
                        resolve(false);
                    }       
                }
            }
            resolve(true);
        });

    });

}
