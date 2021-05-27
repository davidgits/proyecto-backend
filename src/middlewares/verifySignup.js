import { ROLES } from "../models/Role";
import User from "../models/User";
// comprueba si existe nombre usuario, correo
export const checkDuplicate = async (req, res, next) => {
    // user
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).json({ message: "user already exists" });
    // email
    const email = await User.findOne({ email: req.body.email });
    if (email) return res.status(400).json({ message: "email already exists" });

    next();
};
// comprueba si existe rol
export const checkRolesExist = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exists`,
                });
            }
        }
    }
    next();
};
