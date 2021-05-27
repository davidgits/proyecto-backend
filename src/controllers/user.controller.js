import User from "../models/User";

export const createUser = (req, res) => {
    // TODO implementar método 
    res.json("creating user");
};

// TODO eliminar usuario

// TODO editar usuario

// TODO buscar usuario

// lista de usuarios
export const getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};
