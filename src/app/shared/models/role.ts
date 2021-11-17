import { RoleName } from "./enums";

export class Role{

    id: number;
    rolNombre: RoleName;

    constructor(){
        this.id = 0;
        this.rolNombre = RoleName.TECNICO;
    }
}