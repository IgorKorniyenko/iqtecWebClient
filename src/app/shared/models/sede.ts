import { Contacto } from "./contacto";
import { Direccion } from "./direccion";
import { Searchable } from "./searchable";

export class Sede implements Searchable{
    id! : number;
	nombre! : string;
	direccion! : Direccion;
	contacto! : Contacto;
}