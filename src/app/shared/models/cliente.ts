import { Direccion } from "./direccion";
import { Contacto } from "./contacto";
import { Sede } from "./sede";

export class Cliente{
    id! : number;
	nombre : string;
	cif : string;
	direccion : Direccion;
	contacto : Contacto;
	sedes! : Sede[];

	constructor(){
		this.nombre = "";
		this.cif = "";
		this.direccion = new Direccion();
		this.contacto = new Contacto();
	}
}