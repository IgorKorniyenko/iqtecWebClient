import { Headquater } from "./heaquater";
import { Instruction } from "./instruction";
import { Material } from "./material";
import { Project } from "./project";
import { Tracking } from "./tracking";
import { Transport } from "./transport";

export class Request{
    
    idSolicitud: number;
	referencia: string;
	fechaRecogida: string;
	horario: string;
	comentTransporte: string;
	materiales: Material[];
	proyecto: Project;
	sede: Headquater;
	transporte: Transport;
	instrucciones: Instruction;
	seguimientos: Tracking[];

    constructor(){
        this.idSolicitud = 0;
        this.referencia = "";
        this.fechaRecogida = "";
        this.horario = "";
        this.comentTransporte ="";
        this.materiales = [];
        this.proyecto = new Project();
        this.sede = new Headquater();
        this.transporte = new Transport();
        this.instrucciones = new Instruction();
        this.seguimientos = [];
    }
}