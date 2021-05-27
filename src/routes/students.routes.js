import { Router } from "express";
const router = Router();

// importa todos los métodos (controladores)
import * as studentsCtrl from "../controllers/students.controller";
// middlewares
import { authJwt } from "../middlewares";

// crear estudiante
router.post("/", [authJwt.verifyToken, authJwt.isTeacher, authJwt.isAdmin], studentsCtrl.createStudent);
// listar estudiantes
router.get("/", [authJwt.verifyToken, authJwt.isTeacher, authJwt.isAdmin], studentsCtrl.getStudents);
// buscar por id
router.get("/:studentId", [authJwt.verifyToken, authJwt.isTeacher, authJwt.isAdmin], studentsCtrl.getStudentById);
// actualizar
router.put("/:studentId", [authJwt.verifyToken, authJwt.isTeacher, authJwt.isAdmin], studentsCtrl.updateStudentById);
// eliminar
router.delete("/:studentId", [authJwt.verifyToken, authJwt.isTeacher, authJwt.isAdmin], studentsCtrl.deleteStudentById);

export default router;
