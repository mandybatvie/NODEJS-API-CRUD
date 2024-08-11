const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();

const app = express();

const sequelize = require('./config/database');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// Middleware de autenticação
const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Extrai o token após "Bearer"
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user; // Armazena os dados do usuário no request
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

//configuração do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentação API node.js',
      version: '1.0.0',
      description: ' CRUD API da disciplina de serviços web',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
apis: ['./doc/swagger.js'],
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//rotas da API CRUD
app.post('/users', async (req, res) => {
    const { nome, email, cpf, tipo_cadastro, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);
    try {
        const newUser = await User.create({ nome, email, cpf, tipo_cadastro, senha: hashedPassword });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});


app.get('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.put('/users/:id', async (req, res) => {
    const { nome, email, cpf, tipo_cadastro, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 10);
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.update({ nome, email, cpf, tipo_cadastro, senha: hashedPassword });
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (user) {
        await user.destroy();
        res.status(200).json({ message: 'Deleted user' });


    } else {
        res.status(404).json({ error: 'User not found' });
    }
});
// Rota de login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && await bcrypt.compare(senha, user.senha)) {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Rota autenticada
app.get('/profile', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id); // Busca o usuário pelo ID armazenado no token
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' }); 
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//iniciar o servidor
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});
