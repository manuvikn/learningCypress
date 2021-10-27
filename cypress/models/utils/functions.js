
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
