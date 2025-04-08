const jwt = require("jsonwebtoken");

// Middleware para verificar se o token é válido
function authToken(req, res, next) {
    const authHeader = req.headers['authorization']; // Busca o cabeçalho
    const token = authHeader && authHeader.split(' ')[1]; // Separa o token do cabeçalho

    if (!token) return res.sendStatus(401); // Se não houver token, retorna 401 (não autorizado)

    // Verifica se o token é válido
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        
        if (err) return res.sendStatus(403); // Se o token não for válido, retorna 403 (proibido)
        
        req.user = user; // Salva o ID decodificado
        next(); // Libera acesso à rota
    });
}

// Exporta o middleware
module.exports = authToken;