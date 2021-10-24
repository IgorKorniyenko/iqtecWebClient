import { Searchable } from "./searchable";

export class Direccion implements Searchable{
    
    calle : string;
	cp : string;
    poblacion : string;
	provincia : string;
	pais : string;

	constructor(){
		this.calle = "";
		this.cp = "";
		this.poblacion = "";
		this.provincia = "";
		this.pais = "";
	}
}