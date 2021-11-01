import { Direccion } from "./direccion";
import { Contacto } from "./contacto";
import { Sede } from "./sede";
import { Searchable } from "./searchable";

export class Client implements Searchable{
    idCliente! : number;
	razonSocial : string;
	cif : string;
	direccion : Direccion;
	contactos : Contacto[];

	constructor(){
		this.razonSocial = "";
		this.cif = "";
		this.direccion = new Direccion();
		this.contactos = [new Contacto(), new Contacto()];
	}
	
}