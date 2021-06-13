import mongoose from "mongoose";

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    })
    .then((db) => console.log("Database connected OK:", db.connection.name))
    .catch((error) => console.log(error));
