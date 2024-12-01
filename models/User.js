const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nickname: { 
    type: String, 
    required: true, 
    unique: true, // Garantir que o nickname seja único no banco.
    trim: true // Remove espaços extras no início e no final.
  },
  avatar: { 
    type: String, 
    required: true, 
    default: 'default-avatar.png' // Caminho padrão para o avatar.
  },
  ciclo: { 
    type: String, 
    required: true, 
    enum: ['folicular', 'luteal', 'ovulatório', 'menstrual'], // Ciclos permitidos.
    default: 'menstrual' // Valor inicial.
  },
  intensidade: { type: String, required: false },
  
  tiposTreino: { 
    type: [String], 
    required: true, 
    default: [] // Array vazio como padrão.
  },
}, {
  timestamps: true // Adiciona "createdAt" e "updatedAt" automaticamente.
});

module.exports = mongoose.model('User', userSchema);
