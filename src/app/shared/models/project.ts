import { Client } from "./client";

export class Project{

    idProyecto: number;
	nombre: string;
	descripcion: string;
	cliente: Client;

    constructor(){
        this.idProyecto = 0;
        this.nombre = "";
        this.descripcion = "";
        this.cliente = new Client();
    }
}