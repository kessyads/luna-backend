const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Endpoint para login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Busca o usuário com base no email e senha fornecidos
    const user = await User.findOne({ email, senha });

    if (user) {
      res.status(200).json({ nickname: user.nickname, message: 'Login realizado com sucesso!' });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao processar o login.' });
  }
});

module.exports = router;
