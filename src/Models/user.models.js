import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            default: 'Disponible'
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        emailVerified: {
            type: Boolean,
            default: false
        },
        verificationToken: {
            type: String
        },
        activo: {
            type: Boolean,
            default: true
        },
        role: {
            type: String,
            default: 'user',
            required: true
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)
export default User