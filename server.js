import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

dotenv.config(); // Carrega variáveis de ambiente

// Inicializa o app
const app = express();

// Middleware que permite acesso cruzado (CORS) e leitura de JSON
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

// Conecta com o banco MongoDB usando Mongoose
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => console.log('Server is running on port 3000'));
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });