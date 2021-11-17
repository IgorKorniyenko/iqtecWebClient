import { Role } from "./role";

export class User{

    id: number;
    nombreUsuario: string;
    roles: Role[];

    constructor(){
        this.id = 0;
        this.nombreUsuario = "";
        this.roles = [];
    }
}