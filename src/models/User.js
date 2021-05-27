import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: [
            {
                ref: "Role",
                type: Schema.Types.ObjectId, // relaciona el rol con el usuario a través del id de Mongo
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// MÉTODOS ESTÁTICOS

// cifrado de contraseña
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10); // ciclos de encriptado
    return await bcrypt.hash(password, salt);
};
// compara contraseñas
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

export default model("User", userSchema);
