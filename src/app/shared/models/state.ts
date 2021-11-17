import { StateName } from "./enums";

export class State{

    idEstado: number;
    nombreEstado: StateName;

    constructor(){
         this.idEstado = 0;
         this.nombreEstado = StateName.SOLICITADO;
    }
}