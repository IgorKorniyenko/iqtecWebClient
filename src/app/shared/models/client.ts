import { Direccion } from "./direccion";
import { Contacto } from "./contacto";
import { Searchable } from "./searchable";

export class Client implements Searchable{
    idCliente! : number;
	razonSocial : string;
	cif : string;
	direccion : Direccion;
	listaContactos : Contacto[];

	constructor(){
		this.razonSocial = "";
		this.cif = "";
		this.direccion = new Direccion();
		this.listaContactos = [];
	}
	
}