import { UtilsVariante } from "./utils/utils-variante";

export class Panel {

    panel = [];
    panelAux = [];
    generacion= 0;
    utilsVariante = new UtilsVariante('23/3');

    constructor(panel) {
        this.panel = panel;
    }

    async nextTurn() {
        if (this.panel) {
            const promise = new Promise((resolve) => {
                setTimeout(()=> {
                    resolve(this.panel.length);   
                });
            });
            promise.then(async (data) => {
                this.panelAux = await this.generarArray(this.panel);

                await this.forHelper(data);
                this.panel = await this.generarArray(this.panelAux);
                this.generacion = this.generacion + 1;

            });
            
        }
    }

    async forHelper(data) {
        return new Promise(async (resolve) => {
            for (let i = 0; i < data; i++) {
    
                for (let j = 0; j < this.panel[i].length; j++) {
                    let num = await this.contarCeldasVecinas(i, j);
                    this.panelAux[i][j] = num;
                }
    
            }

            setTimeout(()=>{
                resolve();
            })

        })
    }

    generarArray(arrayAnterior) {

        return new Promise((resolve) => {
            let arrayResult = [];
            for (let i = 0; i < arrayAnterior.length; i++) {
    
                let fila = [];
    
                for (let j = 0; j < arrayAnterior[i].length; j++) {
                    fila.push(arrayAnterior[i][j]);
                }
                arrayResult.push( fila );
            }
             
            resolve(arrayResult);

        });

    }

    async contarCeldasVecinas( fila, columna ) {

        return new Promise((resolve) => {
            let celdasVecinas = 0;
    
            if (fila === 0 && this.panel[fila + 1] !== undefined) {
    
                celdasVecinas = 
                (this.panel[fila][columna - 1] !== undefined ? this.panel[fila][columna - 1] : 0) +
                (this.panel[fila][columna + 1] !== undefined ? this.panel[fila][columna + 1] : 0) +
                (this.panel[fila + 1][columna - 1] !== undefined ? this.panel[fila + 1][columna - 1] : 0) +
                (this.panel[fila + 1][columna] !== undefined ? this.panel[fila + 1][columna] : 0) +
                (this.panel[fila + 1][columna + 1] !== undefined ? this.panel[fila + 1][columna + 1] : 0);
    
            } else if (fila === (this.panel.length - 1 ) && this.panel[this.panel.length - 2] !== undefined) {
    
                celdasVecinas = 
                (this.panel[fila - 1][columna - 1] !== undefined ? this.panel[fila - 1][columna - 1] : 0) +
                (this.panel[fila - 1][columna] !== undefined ? this.panel[fila - 1][columna] : 0) +
                (this.panel[fila - 1][columna + 1] !== undefined ? this.panel[fila - 1][columna + 1] : 0) +
                (this.panel[fila][columna - 1] !== undefined ? this.panel[fila][columna - 1] : 0) +
                (this.panel[fila][columna + 1] !== undefined ? this.panel[fila][columna + 1] : 0);
                
            } else {
    
                celdasVecinas = 
                (this.panel[fila - 1][columna - 1] !== undefined ? this.panel[fila - 1][columna - 1] : 0) +
                (this.panel[fila - 1][columna] !== undefined ? this.panel[fila - 1][columna] : 0 )+
                (this.panel[fila - 1][columna + 1] !== undefined ? this.panel[fila - 1][columna + 1] : 0) +
                (this.panel[fila][columna - 1] !== undefined ? this.panel[fila][columna - 1] : 0 )+
                (this.panel[fila][columna + 1] !== undefined ? this.panel[fila][columna + 1] : 0 )+
                (this.panel[fila + 1][columna - 1] !== undefined ? this.panel[fila + 1][columna - 1] : 0) +
                (this.panel[fila + 1][columna] !== undefined ? this.panel[fila + 1][columna] : 0 )+
                (this.panel[fila + 1][columna + 1] !== undefined ? this.panel[fila + 1][columna + 1] : 0);
    
            }
         
            const celdasMotor = this.utilsVariante.aplicarMotor(this.panel[fila][columna], celdasVecinas);
            resolve(celdasMotor);
        });
        

    }
 
}