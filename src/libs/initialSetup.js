import Role from "../models/Role";

export const createRoles = async () => {
    try {
        // contamos si existen roles
        const count = await Role.estimatedDocumentCount();

        // si ya existe sale de la función
        if (count > 0) return;

        // creamos los roles y ejecutamos todas las funciones al mismo tiempo
        const values = await Promise.all([
            new Role({ name: "student" }).save(), 
            new Role({ name: "teacher" }).save(), 
            new Role({ name: "admin" }).save()
        ]);

        console.log(values);

    } catch (error) {

        console.error(error);
        
    }
};
