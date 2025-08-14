// Rota para servir o index.html na raiz (compatível com Vercel)
app.get('/', (req, res) => {
    res.sendFile(require('path').join(__dirname, 'index.html'));
});
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Schemas e Models para cada categoria de comandos
const comandoSchema = new mongoose.Schema({
    nome: String,
    descricao: String,
    criadoEm: { type: Date, default: Date.now },
});

const ComandoArquivo = mongoose.model('ComandoArquivo', comandoSchema);
const ComandoSistema = mongoose.model('ComandoSistema', comandoSchema);
const ComandoRede = mongoose.model('ComandoRede', comandoSchema);
const ComandoPacote = mongoose.model('ComandoPacote', comandoSchema);
const ComandoUtil = mongoose.model('ComandoUtil', comandoSchema);

// Modelo simples para itens
const Item = mongoose.model('Item', new mongoose.Schema({
    nome: String,
    descricao: String,
    criadoEm: { type: Date, default: Date.now },
}));

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB conectado!'))
    .catch((err) => console.error('Erro ao conectar no MongoDB:', err));

// Função utilitária para CRUD de comandos
function createComandoCrudRoutes(model, categoria) {
    // Listar todos
    app.get(`/api/v1/comandos/${categoria}`, async (req, res) => {
        const comandos = await model.find();
        res.json(comandos);
    });

    // Buscar por ID
    app.get(`/api/v1/comandos/${categoria}/:id`, async (req, res) => {
        const comando = await model.findById(req.params.id);
        if (!comando) return res.status(404).json({ error: 'Não encontrado' });
        res.json(comando);
    });

    // Criar
    app.post(`/api/v1/comandos/${categoria}`, async (req, res) => {
        const novo = new model(req.body);
        await novo.save();
        res.status(201).json(novo);
    });

    // Atualizar
    app.put(`/api/v1/comandos/${categoria}/:id`, async (req, res) => {
        const atualizado = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!atualizado) return res.status(404).json({ error: 'Não encontrado' });
        res.json(atualizado);
    });

    // Remover
    app.delete(`/api/v1/comandos/${categoria}/:id`, async (req, res) => {
        const removido = await model.findByIdAndDelete(req.params.id);
        if (!removido) return res.status(404).json({ error: 'Não encontrado' });
        res.json({ message: 'Removido com sucesso' });
    });
}

// CRUD para cada categoria
createComandoCrudRoutes(ComandoArquivo, 'arquivos');
createComandoCrudRoutes(ComandoSistema, 'sistema');
createComandoCrudRoutes(ComandoRede, 'rede');
createComandoCrudRoutes(ComandoPacote, 'pacotes');
createComandoCrudRoutes(ComandoUtil, 'util');

// Rotas GET para comandos por categoria (mock)
app.get('/api/v1/comandos/arquivos', (req, res) => {
    res.json({ comandos: [], categoria: 'arquivos' });
});
app.get('/api/v1/comandos/sistema', (req, res) => {
    res.json({ comandos: [], categoria: 'sistema' });
});
app.get('/api/v1/comandos/rede', (req, res) => {
    res.json({ comandos: [], categoria: 'rede' });
});
app.get('/api/v1/comandos/pacotes', (req, res) => {
    res.json({ comandos: [], categoria: 'pacotes' });
});
app.get('/api/v1/comandos/util', (req, res) => {
    res.json({ comandos: [], categoria: 'util' });
});

// CRUD simples com MongoDB para itens
app.get('/api/v1/itens', async (req, res) => {
    const itens = await Item.find();
    res.json(itens);
});
app.get('/api/v1/itens/:id', async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Não encontrado' });
    res.json(item);
});
app.post('/api/v1/itens', async (req, res) => {
    const novo = new Item(req.body);
    await novo.save();
    res.status(201).json(novo);
});
app.put('/api/v1/itens/:id', async (req, res) => {
    const atualizado = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) return res.status(404).json({ error: 'Não encontrado' });
    res.json(atualizado);
});
app.delete('/api/v1/itens/:id', async (req, res) => {
    const removido = await Item.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ error: 'Não encontrado' });
    res.json({ message: 'Removido com sucesso' });
});

// Inicialização
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
