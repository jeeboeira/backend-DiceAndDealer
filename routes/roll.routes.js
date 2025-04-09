import express from 'express';
import { VerifyToken } from '../middleware/auth.middleware.js';
const router = express.Router();
import Roll from '../models/roll.model.js';

// Rota para registrar uma nova rolagem
router.post('/', VerifyToken, async (req, res) => {
    try {
        const { dado, rollResult } = req.body;

        // Cria uma nova rolagem
        const roll = new Roll({
            userId: req.user.id,
            dado,
            rollResult
        });

        await roll.save();
        res.status(201).json(roll);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar a rolagem', error });
    }
});

// Rota para pegar histórico do usuário
router.get('/history', VerifyToken, async (req, res) => {
    try {
        const history = await Roll.find({ userId: req.user.id }).sort({ data: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar histórico', error });
    }
});

// Exporta as rotas
export default router;