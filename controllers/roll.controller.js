import Roll from "../models/roll.model";

// Criar uma nova rolagem
export const SaveRoll = async (req, res) => {
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
};

// Pegar histórico do usuário
export const GetRollHistory = async (req, res) => {
    try {
        const history = await Roll.find({ userId: req.user.id }).sort({ data: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar histórico', error });
    }
};

// Atualizar rolagem
export const UpdateRoll = async (req, res) => {
    try {
        const { id } = req.params;
        const { rollResult, dado } = req.body;

        const updated = await Roll.findByIdAndUpdate(
            { _id: id, userId: req.user.id },
            { rollResult, dado },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: 'Rolagem não encontrada' });
        }
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar a rolagem', error });
    }
};

// Deletar rolagem
export const DeleteRoll = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Roll.findByIdAndDelete({ _id: id, userId: req.user.id });
        if (!deleted) {
            return res.status(404).json({ message: 'Rolagem não encontrada' });
        }
        res.json({ message: 'Rolagem excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir a rolagem', error });
    }
};