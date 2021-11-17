export class Instruction{
    
    idInstrucciones: number;
	comentInventario: string; 
	destruir: boolean;
    degauss: boolean;
    pasarReciclaje: boolean;
    separarReciclaje: boolean;
    reciclarTodo: boolean;
    observaciones: string;
	
    constructor(){
        this.idInstrucciones = 0;
        this.comentInventario = "";
        this.observaciones = "";
        this.destruir = false;
        this.degauss = false;
        this.pasarReciclaje = false;
        this.separarReciclaje = false;
        this.reciclarTodo = false;
    }
}