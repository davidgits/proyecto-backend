import mongoose from "mongoose";

mongoose
    .connect("mongodb://localhost/escueladb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    })
    .then((db) => console.log("Database connected OK:", db.connection.name))
    .catch((error) => console.log(error));
