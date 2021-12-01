import { Direccion } from "./direccion";
import { Contacto } from "./contacto";
import { Searchable } from "./searchable";

export class Client {
    idCliente : number;
	razonSocial : string;
	cif : string;
	direccion : Direccion;
	listaContactos : Contacto[];
	activo: boolean;

	constructor(){
		this.idCliente = 0;
		this.razonSocial = "";
		this.cif = "";
		this.direccion = new Direccion();
		this.listaContactos = [new Contacto(), new Contacto()];
		this.activo = false;
	}
	
}