import { Searchable } from "./searchable";

export class Contacto implements Searchable{
    
    idContacto! : number;
    nombre : string;
    telefono1: string;
    telefono2: string;
    email : string;


    constructor(){

        this.nombre = "";
        this.telefono1 = "";
        this.telefono2 = "";
        this.email = "";

    }
}