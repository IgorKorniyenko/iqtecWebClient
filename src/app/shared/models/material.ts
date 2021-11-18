import { MaterialType } from "./materialType";

export class Material{

    idMaterial!: number;
	tipo: MaterialType;
	cantidad: number;

    constructor(){
        
        this.tipo = new MaterialType();
        this.cantidad = 0;
    }

    
}