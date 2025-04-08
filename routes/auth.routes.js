import express from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', register);

// Rota para fazer login
router.post('/login', login);

// Exporta as rotas
export default router;