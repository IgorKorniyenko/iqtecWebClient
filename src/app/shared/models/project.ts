import { Client } from "./client";

export class Project{

    idProyecto: number;
	nombre: string;
	descripcion: string;
	cliente: Client;
    activo: boolean;

    constructor(){
        this.idProyecto = 0;
        this.nombre = "";
        this.descripcion = "";
        this.cliente = new Client();
        this.activo = false;
    }
}