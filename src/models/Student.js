import { model, Schema } from "mongoose";

const studentSchema = new Schema(
    {
        username: String,
        name: String,
        surname: String,
        dni: String,
        email: String,
        address: String,
        phone: Number,
        birthdate: Date,
        activity: [
            {
                name: String,
                group: String,
            },
        ],
        enrolldate: Date,
        imgUrl: String
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model("Student", studentSchema);
