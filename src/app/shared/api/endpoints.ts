export const BASEURL = 'http://localhost:8080/';

export const CLIENTENDPOINTS = new Map([
    ["create", "Iqtec/clientes/crear"],
    ["getall", "Iqtec/clientes/consultar"],
    ["getbyname", "Iqtec/clientes/nombre/"],
    ["delete", "Iqtec/clientes/eliminar"],
    ["update", "Iqtec/clientes/actualizar"]
]);

export const PROJECTENDPOINTS = new Map([
    ["create", "Iqtec/proyectos/crear"],
    ["getall", "Iqtec/proyectos/consultar"],
    ["getbyname", "Iqtec/proyectos/nombre/"],
    ["delete", "Iqtec/proyectos/eliminar/"],
    ["update", "Iqtec/proyectos/actualizar"]
]);

export const REQUESTENDPOINTS = new Map([
    ["create", "Iqtec/solicitud/crear"],
    ["getall", "Iqtec/solicitud/consultar"],
    ["getbyname", "Iqtec/solicitud/porReferencia/"],
    ["delete", "Iqtec/solicitud/eliminar/"],
    ["update", "Iqtec/solicitud/actualizar"]
]);

export const TRANSPORTENDPOINTS = new Map([
    ["create", "Iqtec/transportes/crear"],
    ["getall", "Iqtec/transportes/consultar"],
    ["getbyname", "Iqtec/transportes/nombre/"],
    ["delete", "Iqtec/transportes/eliminar/"],
    ["update", "Iqtec/transportes/actualizar"]
]);

export const HEADQUATERSENDPOINTS = new Map([
    ["create", "Iqtec/sedes/crear"],
    ["getall", "Iqtec/sedes/consultar"],
    ["getbyname", "Iqtec/sedes/nombre/"],
    ["delete", "Iqtec/sedes/eliminar/"],
    ["update", "Iqtec/sedes/actualizar"]
]);