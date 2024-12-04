// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.signup = async (req, res) => {
  const { email, senha, nickname, avatar } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já cadastrado.' });
    }

    const newUser = new User({ email, senha, nickname, avatar });
    await newUser.save();

    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar usuário.' });
  }
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    res.status(200).json({ nickname: user.nickname, avatar: user.avatar, message: 'Login realizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao processar o login.' });
  }
};

exports.updateProfile = async (req, res) => {
  const { userId, nickname, avatar, peso, altura } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { nickname, avatar, peso, altura },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Perfil atualizado com sucesso!', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar perfil.', error });
  }
};

