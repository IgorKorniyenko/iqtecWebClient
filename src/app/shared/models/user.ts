import { Role } from "./role";

export class    User{

    id: number;
    nombreUsuario: string;
    password: string;
    roles: Role[];
    activo: boolean;

    constructor(){
        this.id = 0;
        this.nombreUsuario = "";
        this.password ="";
        this.roles = [new Role()];
        this.activo = true;
    }
}