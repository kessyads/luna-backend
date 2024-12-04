require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const healthRoutes = require('./routes/healthRoutes');
const activityRoutes = require('./routes/activityRoutes');

const app = express();

app.use(bodyParser.json());

const uri = process.env.MONGO_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

app.use('/api/user', userRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/activity', activityRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
