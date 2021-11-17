import { Client } from "./client";
import { Contacto } from "./contacto";
import { Direccion } from "./direccion";
import { Searchable } from "./searchable";

export class Headquater implements Searchable{
    idSede! : number;
	nombre! : string;
	cif! : string;
	direccion! : Direccion;
	listaContactos! : Contacto[];
	cliente! : Client;

	constructor(){
		this.idSede = 0;
		this.nombre = "";
		this.direccion = new Direccion();
		this.listaContactos = [new Contacto()];
		this.cliente = new Client();
	}
}