import { MaterialType } from "./materialType";

export class Material{

    idMaterial: number;
	tipo: MaterialType;
	cantidad: number;

    constructor(type: string, quantity: number){
        this.idMaterial = 0;
        this.tipo = new MaterialType(type);
        this.cantidad = quantity;
    }
}