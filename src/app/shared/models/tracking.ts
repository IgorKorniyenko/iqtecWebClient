import { State } from "./state";
import { User } from "./user";

export class Tracking{

    idSeguimiento: number;
	estado: State;
	fecha: Date;
    usuario: User;
    

    constructor(){
        this.idSeguimiento = 0;
        this.estado = new State();
        this.fecha = new Date();
        this.usuario = new User();
    }
}