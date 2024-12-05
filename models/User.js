// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  senha: { type: String, required: true },
  nickname: { type: String, required: true, unique: true, trim: true },
  avatar: { type: String, default: 'default-avatar.png' },
  peso: { type: Number, required: false },
  altura: { type: Number, required: false },
  ciclo: { type: String, enum: ['folicular', 'luteal', 'ovulatório', 'menstrual'], default: 'menstrual' },
  intensidade: { type: String },
  tiposTreino: { type: [String], default: [] },
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next();
  try {
    this.senha = await bcrypt.hash(this.senha, 10);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('User', userSchema);
