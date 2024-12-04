// controllers/activityController.js
const User = require('../models/User');

exports.updateActivity = async (req, res) => {
  const { userId, intensidade, tiposTreino } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { intensidade, tiposTreino },
      { new: true } 
    );

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({ message: 'Informações de atividade física atualizadas com sucesso!', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar as informações de atividade física.', error });
  }
};

exports.getActivity = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select('intensidade tiposTreino');

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.status(200).json({ activityData: user });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter as informações de atividade física.', error });
  }
};
