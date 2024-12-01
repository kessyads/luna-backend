const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); // Caminho correto para o arquivo de rotas

const app = express();

// Middleware para tratar JSON no corpo das requisições
app.use(bodyParser.json());

// Conexão ao MongoDB
const uri = "mongodb+srv://kesiaadsantos:AdjIFzH3laWOU2wI@cluster0.7h4sg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

  app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
      // Simulando validação com um usuário fictício
      if (email === "teste@exemplo.com" && senha === "123456") {
        res.status(200).json({ nickname: "Usuário Teste" });
      } else {
        res.status(401).json({ message: "Credenciais inválidas." });
      }
    } catch (error) {
      res.status(500).json({ message: "Erro no servidor.", error });
    }
  });
  
// Rotas da aplicação
app.use('/api/user', userRoutes);

// Porta do servidor
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
