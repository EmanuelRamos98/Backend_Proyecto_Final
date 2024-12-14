import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
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
        image_base64: {
            type: String,
            default: ''
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
        },
        contacts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)
export default User