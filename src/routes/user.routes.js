import { Router } from "express";
const router = Router();

import * as userCtrl from "../controllers/user.controller";
import { authJwt, veryfySignup } from "../middlewares";

// listar usuarios (admin requerido)
router.get("/", [
    authJwt.verifyToken, 
    authJwt.isAdmin,
    veryfySignup.checkRolesExist
], userCtrl.getUsers);

// crear un usuario (admin requerido)
router.post("/newuser", [
    authJwt.verifyToken, 
    authJwt.isAdmin,
    veryfySignup.checkRolesExist
], userCtrl.createUser);

export default router;
