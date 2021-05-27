import User from "../models/User";
// import Student from "../models/Student";
// import Teacher from "../models/Teacher";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

// NUEVO USUARIO
export const signUp = async (req, res) => {
    
    const { username, email, password, roles } = req.body;
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
    });

    // roles
    if (roles) {
        // busca dentro de la propiedad si existe un rol y le asigna el id
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map((role) => role._id);
    } else {
        // si no existe o no se da un rol existente le asigna por defecto el de estudiante
        const role = await Role.findOne({ name: "student" });
        newUser.roles = [role._id];
    }

    // crea un alumno con username y email del usuario creado
    // if(role.name === 'student') {
    //     const newStudent = new Student({
    //         username: newUser.username,
    //         email: newUser.username
    //     });
    //     const savedStudent = await newStudent.save();
    //     console.log(savedStudent);
    // }

    // guarda el usuario
    const savedUser = await newUser.save();
    console.log(savedUser);

    // genera token
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 7200, // 24 horas (seg)
    });

    // devuelve el token
    res.status(200).json({ token });
    res.json({"message": "new user created"});
};

export const signIn = async (req, res) => {
    // buscamos si existe el email en la bd
    const userFound = await User.findOne({ email: req.body.email }).populate("roles"); // populate puebla el objeto roles
    if (!userFound)
        return res.status(400).json({
            message: "User not found",
        });
    // compara contraseñas
    const matchPassword = await User.comparePassword(req.body.password, userFound.password);
    if (!matchPassword) return res.status(401).json({ token: null, message: "Invalid password" });

    // devuelve token
    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 7200,
    });
    console.log(userFound);
    const username = userFound.username;
    const message = `Bienvenido ${username}`;
    res.status(200).json({ token, username, message }); // = token: token
};
