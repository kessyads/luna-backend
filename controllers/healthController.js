// controllers/healthController.js
const User = require('../models/User');

exports.updateHealth = async (req, res) => {
  const { userId, ciclo, metodoContraceptivo, regularidade } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { ciclo, metodoContraceptivo, regularidade },
      { new: true } 
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Informações de saúde atualizadas com sucesso!', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar as informações de saúde.', error });
  }
};

exports.getHealth = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select('ciclo metodoContraceptivo regularidade');

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({ healthData: user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter as informações de saúde.', error });
  }
};
