import { Contacto } from "./contacto";
import { Direccion } from "./direccion";

export class Transport {
    id: number;
	nombre: string;
	cif: string;
	direccion: Direccion;
	listaContactos: Contacto[];
    activo: boolean;

    constructor(){
        this.id = 0;
        this.nombre = "";
        this.cif = "";
        this.direccion = new Direccion();
        this.listaContactos = [new Contacto()];
        this.activo = false;
    }
}