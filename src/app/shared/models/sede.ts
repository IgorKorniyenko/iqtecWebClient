import { Contacto } from "./contacto";
import { Direccion } from "./direccion";

export class Sede {
    id! : number;
	nombre! : string;
	direccion! : Direccion;
	contacto! : Contacto;
}