import mongoose from "mongoose";

// Define o schema do usuário
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    }
});

// Exporta o modelo com o nome 'User'
export default mongoose.model('User', userSchema);