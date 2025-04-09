import mongoose from 'mongoose';

// Define o schema de rolagem
const rollSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,   // Relaciona com o usuário
        ref: 'User',                         // Referência ao modelo de usuário
        required: true
    },
    dado: {
        type: String, // Ex: "d6", "d20"
        required: true
    },
    rollResult: {
        type: Number,                           // O valor que saiu na rolagem
        required: true
    },
    data: {
        type: Date,                             // Data da rolagem                             
        default: Date.now                       // Coloca a data atual automaticamente
    }
});

// Exporta o modelo com o nome 'Roll'
const Roll = mongoose.model('Roll', rollSchema);
export default Roll;