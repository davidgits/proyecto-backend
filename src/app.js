// configura aplicación express
// servidor básico:
import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import methodOverride from "method-override";
import session from "express-session";

import { createRoles } from "./libs/initialSetup";

import studentsRoutes from "./routes/students.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import cors from 'cors'

const app = express();
createRoles(); // crea los roles al inicio de la app

app.set("pkg", pkg);

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" })); // comunicación entre dev servers en local

// métodos de recogida de datos desde formularios
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride());
// sesión
app.use(
    session({
        secret: "dojo",
        resave: true,
        saveUninitialized: true,
    })
);
// mensaje raíz
app.get("/", (req, res) => {
    res.json({
        author: app.get("pkg").author,
        description: app.get("pkg").description,
        version: app.get("pkg").version,
    });
});

app.use("/api/students", studentsRoutes);
app.use("/api/auth", authRoutes); // logging y register
app.use("/api/users", userRoutes);

export default app;
