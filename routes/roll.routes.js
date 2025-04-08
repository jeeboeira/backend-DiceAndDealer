const express = require('express');
const router = express.Router();
const Roll = require('../models/Roll.model');
const authToken = require('../middleware/authMiddleware');

// Rota para registrar uma nova rolagem
router.post('/roll', authToken, async (req, res) => {
    try {
        const { dado, rollResult } = req.body;

        // Cria uma nova rolagem
        const roll = new Roll({
            userId: req.user.id,
            dado,
            rollResult
        });

        await roll.save();
        res.status(201).json(novaRoll);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar a rolagem', error });
    }
});

// Rota para pegar histórico do usuário
router.get('/roll/history', authToken, async (req, res) => {
    try {
        const history = await Roll.find({ userId: req.user.id }).sort({ data: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar histórico', error });
    }
});

// Exporta as rotas
module.exports = router;