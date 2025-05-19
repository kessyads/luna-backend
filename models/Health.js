const mongoose = require('mongoose');

const healthSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dataUltimoCiclo: Date,
  metodoContraceptivo: String,
  regularidade: String,
});

module.exports = mongoose.model('Health', healthSchema);
