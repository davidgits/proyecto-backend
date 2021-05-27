import { model, Schema } from "mongoose";

const teacherSchema = new Schema(
    {
        username: String,
        name: String,
        surname: String,
        dni: String,
        email: String,
        address: String,
        phone: Number,
        activity: [
            {
                name: String,
                group: String,
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Teacher", teacherSchema);