const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(cors());


const users = [];


app.post('/register', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: 'Nome e e-mail são obrigatórios.' });
    }

    
    users.push({ name, email });
    console.log('Usuário registrado:', { name, email });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
