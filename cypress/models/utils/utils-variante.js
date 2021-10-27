
export class UtilsVariante {

    nacer = null;
    vivir = null;
    variante = null;

    constructor(variante) {
        this.variante = variante;
        let arrVariante = this.variante.split('/');
        this.vivir = arrVariante[0];
        this.nacer = arrVariante[1];
    }

    aplicarMotor(celdaViva, celdasVecinas) {

        if (Boolean(celdaViva)) {
            // Si ya esta viva comprobar que cumple con la condición vivir            
            return Number((this.vivir.indexOf(celdasVecinas.toString()) !== -1));
            
        } else {
            // Si esta muerta para nacer tendrá que cumplir la condición
            return Number((this.nacer.indexOf(celdasVecinas.toString()) !== -1));
        }

    }
    

}