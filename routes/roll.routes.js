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

// Rota para atualizar uma rolagem
router.put('/:id', VerifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { rollResult, dado } = req.body;
        if (rollResult < 1 || rollResult > 6) {
            return res.status(400).json({ message: 'Resultado inválido. Deve ser entre 1 e 6.' });
          }
        const updatedRoll = await Roll.findByIdAndUpdate(
            { _id: id, userId: req.user.id },
            { rollResult, dado },
            { new: true }
        );
        if (!updatedRoll) {
            return res.status(404).json({ message: 'Rolagem não encontrada' });
        }
        res.json(updatedRoll);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar a rolagem', error });
    }
});

// Rota para deletar uma rolagem
router.delete('/:id', VerifyToken, async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRoll = await Roll.findByIdAndDelete({ _id: id, userId: req.user.id });
        if (!deletedRoll) {
            return res.status(404).json({ message: 'Rolagem não encontrada' });
        }
        res.json({ message: 'Rolagem deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar a rolagem', error });
    }
});

// Exporta as rotas
export default router;