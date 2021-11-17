import { Direccion } from "./direccion";
import { Contacto } from "./contacto";
import { Searchable } from "./searchable";

export class Client {
    idCliente : number;
	razonSocial : string;
	cif : string;
	direccion : Direccion;
	listaContactos : Contacto[];

	constructor(){
		this.idCliente = 0;
		this.razonSocial = "";
		this.cif = "";
		this.direccion = new Direccion();
		this.listaContactos = [new Contacto(), new Contacto()];
	}
	
}