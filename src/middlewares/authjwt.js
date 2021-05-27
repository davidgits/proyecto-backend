// VALIDACIÓN
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from '../models/Role'

// verifica si estoy enviando un token (intermediario entre funciones)
export const verifyToken = async (req, res, next) => {
    try {
        // recibimos un token
        const token = req.headers["x-access-token"];

        // si no existe el token
        if (!token) return res.status(403).json({ message: "No token provided" });

        // si existe extraemos lo que hay dentro del token
        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;
        // req.userId = decoded.id; // guarda en una propiedad el id decodificado del token

        // buscamos el usuario que corresponde al token
        const user = await User.findById(req.userId, { password: 0 });
        // si no existe el usuario devuelve mensaje de error
        if (!user) return res.status(404).json({ message: "no user found" });

        // si existe, continua
        next();
    } catch (error) {
        return res.status(401).json({ message: "unauthorized or invalid token" });
    }
};

// comprueba si es profe
export const isTeacher = async (req, res, next) => {
    // busca los roles del usuario
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    // si encuentra el rol de profesor, continúa
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "teacher") {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Require teacher role" });
};

// comprueba si es admin
export const isAdmin = async (req, res, next) => {
    // busca los roles del usuario
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });

    // si encuentra el rol de admin, continúa
    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
            next();
            return;
        }
    }
    return res.status(403).json({ message: "Require admin role" });
};
