import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica se o usuário já existe
        const exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ message: "Usuário já existe" });

        // Criptografa a password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria um novo usuário
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "Usuário criado com sucesso" });
    }
    catch (error) {
        console.error('Erro no register:', error);
        res.status(500).json({ message: "Erro ao criar usuário" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica se o usuário existe
        if (!email || !password) {
            console.log('Marco 0 Email ou password não informados');
            return res.status(400).json({ message: "Email e password são obrigatórios" });
        }
        const user = await User.findOne({ email });


        console.log('Marco 1 Usuário encontrado:', user); // 👈 Veja se password aparece aqui


        if (!user) {
            console.log('Marco 2 Usuário não encontrado');
            return res.status(400).json({ message: "Usuário não encontrado" });
        }

        if (!user.password) {
            console.log('Marco 3 password não encontrada');
            return res.status(400).json({ message: "password não encontrada" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('Marco 4 password não confere');
            return res.status(401).json({ message: "password inválida" });
        }

        // Gera um token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        console.log('Token gerado:', token); // 👈 Veja se password aparece aqui

        return res.status(200).json({ token, user: { id: user._id, email: user.email } });

    }
    catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: "Erro ao fazer login" });
    }
};