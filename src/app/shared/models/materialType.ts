import { MaterialTypes } from "./enums";


export class MaterialType{

    idTipo!: number;
    tipoMaterial: string;

    constructor(){
        
        this.tipoMaterial = "";
    }

    stringToEnum(providedType: string): MaterialTypes{

        let exitEnum;

        switch(providedType){
            case 'PC':
                exitEnum = MaterialTypes.PC;
                break;

            case 'HDD':
                exitEnum = MaterialTypes.HDD;
                break;

            case 'PORTATIL':
                exitEnum = MaterialTypes.PORTATIL;
                break;

            case 'SERVIDOR':
                exitEnum = MaterialTypes.SERVIDOR;
                break;

            case 'TFT':
                exitEnum = MaterialTypes.TFT;
                break;

            case 'TELEFONO':
                exitEnum = MaterialTypes.TELEFONO;
                break;

            case 'TABLET':
                exitEnum = MaterialTypes.TABLET;
                break;

            case 'IMPRESORA':
                exitEnum = MaterialTypes.IMPRESORA;
                break;

            case 'CAJA_VARIOS':
                exitEnum = MaterialTypes.CAJA_VARIOS;
                break;

        }

        return exitEnum;
    }
}