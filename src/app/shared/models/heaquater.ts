import { Contacto } from "./contacto";
import { Direccion } from "./direccion";
import { Searchable } from "./searchable";

export class Headquater implements Searchable{
    id! : number;
	nombre! : string;
	direccion! : Direccion;
	contacto! : Contacto;
}