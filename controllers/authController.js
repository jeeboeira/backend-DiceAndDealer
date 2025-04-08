import Usuario from "../models/Users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Verifica se o usuário já existe
        const exist = await Usuario.findOne({ email });
        if (exist) return res.status(400).json({ message: "Usuário já existe" });

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(senha, 10);

        // Cria um novo usuário
        const usuario = new Usuario({ email, senha: hashedPassword });
        await usuario.save();
        res.status(201).json({ message: "Usuário criado com sucesso" });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao criar usuário" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(400).json({ message: "Usuário não encontrado" });

        const isMatch = await bcrypt.compare(senha, usuario.senha);
        if (!isMatch) return res.status(401).json({ message: "Senha inválida" });

        // Gera um token JWT
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({ token, usuario: { id: usuario._id, email: usuario.email } });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao fazer login" });
    }
};