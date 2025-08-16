require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(express.json());

// Serve estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "../public")));
app.use('/images', express.static(path.join(__dirname, "../public/images")));
app.use('/favicon.ico', express.static(path.join(__dirname, '../public/favicon.ico')));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});


// Definição do schema para comandos
const comandoSchema = new mongoose.Schema({
    comandos: {type: String, required: true},
    descricao: {type: String, required: true},
    categoria: {type: String, required: true},
    exemplo: [{
            comando: {type: String, required: true},
            descricao: {type: String, required: true}
        }]
}, { minimize: false });

const ComandoArquivo = mongoose.model('ComandoArquivo', comandoSchema);
const ComandoSistema = mongoose.model('ComandoSistema', comandoSchema);
const ComandoRede = mongoose.model('ComandoRede', comandoSchema);
const ComandoPacote = mongoose.model('ComandoPacote', comandoSchema);
const ComandoUtil = mongoose.model('ComandoUtil', comandoSchema);

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
        try {
            const comandos = await model.find();
            res.json(comandos);
        } catch (err) {
            res.status(500).json({ error: 'Erro ao buscar comandos' });
        }
    });

    // Buscar por ID
    app.get(`/api/v1/comandos/${categoria}/:id`, async (req, res) => {
        try {
            const comando = await model.findById(req.params.id);
            if (!comando) return res.status(404).json({ error: 'Não encontrado' });
            res.json(comando);
        } catch (err) {
            res.status(400).json({ error: 'ID inválido' });
        }
    });

    // Criar
    app.post(`/api/v1/comandos/${categoria}`, async (req, res) => {
        try {
            const novo = new model(req.body);
            await novo.save();
            res.status(201).json(novo);
        } catch (err) {
            res.status(400).json({ error: 'Erro ao criar comando' });
        }
    });

    // Atualizar
    app.put(`/api/v1/comandos/${categoria}/:id`, async (req, res) => {
        try {
            const atualizado = await model.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!atualizado) return res.status(404).json({ error: 'Não encontrado' });
            res.json(atualizado);
        } catch (err) {
            res.status(400).json({ error: 'Erro ao atualizar comando' });
        }
    });

    // Remover
    app.delete(`/api/v1/comandos/${categoria}/:id`, async (req, res) => {
        try {
            const removido = await model.findByIdAndDelete(req.params.id);
            if (!removido) return res.status(404).json({ error: 'Não encontrado' });
            res.json({ message: 'Removido com sucesso' });
        } catch (err) {
            res.status(400).json({ error: 'Erro ao remover comando' });
        }
    });
}

// CRUD para cada categoria
createComandoCrudRoutes(ComandoArquivo, 'arquivos');
createComandoCrudRoutes(ComandoSistema, 'sistema');
createComandoCrudRoutes(ComandoRede, 'rede');
createComandoCrudRoutes(ComandoPacote, 'pacotes');
createComandoCrudRoutes(ComandoUtil, 'util');


// Inicialização
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
