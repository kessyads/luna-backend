const Health = require('../models/Health');

exports.updateHealth = async (req, res) => {
  const { userId, dataUltimoCiclo, metodoContraceptivo, regularidade } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'ID de usuária é obrigatório.' });
  }

  try {
    let health = await Health.findOne({ userId });

    if (!health) {
      health = new Health({ userId });
    }

    // Atualizações parciais
    if (dataUltimoCiclo !== undefined) {
      health.dataUltimoCiclo = dataUltimoCiclo;
    }
    if (metodoContraceptivo !== undefined) {
      health.metodoContraceptivo = metodoContraceptivo;
    }
    if (regularidade !== undefined) {
      health.regularidade = regularidade;
    }

    await health.save();

    res.status(200).json({
      message: 'Dados de saúde atualizados com sucesso.',
      healthData: health,
    });
  } catch (error) {
    console.error('Erro ao atualizar dados de saúde:', error);
    res.status(500).json({ message: 'Erro ao atualizar dados de saúde.', error: error.message });
  }
};

exports.getHealth = async (req, res) => {
  const { userId } = req.params;

  try {
    const health = await Health.findOne({ userId });

    if (!health) {
      return res.status(404).json({ message: 'Informações de saúde não encontradas.' });
    }

    res.status(200).json({ healthData: health });
  } catch (error) {
    console.error('Erro ao obter as informações de saúde:', error);
    res.status(500).json({ message: 'Erro ao obter as informações de saúde.', error: error.message });
  }
};
