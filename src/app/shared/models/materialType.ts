import { MaterialTypes } from "./enums";


export class MaterialType{

    idTipo: number;
    tipoMaterial: MaterialTypes;

    constructor(type: string){
        this.idTipo = 0;
        this.tipoMaterial = this.stringToEnum(type);
    }

    stringToEnum(providedType: string): MaterialTypes{

        let exitEnum;

        switch(providedType){
            case 'PC':
                exitEnum = MaterialTypes.PC;
                break;

        }

        return exitEnum;
    }
}