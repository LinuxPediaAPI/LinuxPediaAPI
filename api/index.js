require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middlewares
app.use(express.json());

// Headers de segurança e performance
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Serve estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "../public")));
app.use('/images', express.static(path.join(__dirname, "../public/images")));
app.use('/favicon.ico', express.static(path.join(__dirname, '../public/favicon.ico')));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
// Definição do schema para exemplos
const exemploSchema = new mongoose.Schema({
    comando: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    }
});


// Definição do schema para comandos
const comandoSchema = new mongoose.Schema({
    comandos: { type: String, required: true },
    descricao: { type: String, required: true },
    categoria: { type: String, required: true },
    exemplo: [exemploSchema]
}, { minimize: false });

const ComandoArquivo = mongoose.model('ComandoArquivo', comandoSchema);
const ComandoSistema = mongoose.model('ComandoSistema', comandoSchema);
const ComandoRede = mongoose.model('ComandoRede', comandoSchema);
const ComandoPacote = mongoose.model('ComandoPacote', comandoSchema);
const ComandoUtil = mongoose.model('ComandoUtil', comandoSchema);

// Configuração otimizada do MongoDB
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

// Conexão com MongoDB com tratamento de erro robusto
if (!process.env.MONGODB_URI) {
    console.error('⚠️ MONGODB_URI não configurado!');
} else {
    mongoose.connect(process.env.MONGODB_URI, mongoOptions)
        .then(() => console.log('✅ MongoDB conectado!'))
        .catch((err) => {
            console.error('❌ Erro ao conectar no MongoDB:', err.message);
            // Não mata o processo, permite que a aplicação continue
        });
}

// Cache em memória simples (60 segundos)
const cache = new Map();
const CACHE_TTL = 60000; // 60 segundos

function getFromCache(key) {
    const cached = cache.get(key);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }
    cache.delete(key);
    return null;
}

function setCache(key, data) {
    cache.set(key, { data, timestamp: Date.now() });
    // Limita o tamanho do cache
    if (cache.size > 100) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
    }
}

// Função utilitária para CRUD de comandos
function createComandoCrudRoutes(model, categoria) {
    // Listar todos com cache
    app.get(`/api/v1/comandos/${categoria}`, async (req, res) => {
        const cacheKey = `comandos_${categoria}`;
        
        try {
            // Verifica cache
            const cached = getFromCache(cacheKey);
            if (cached) {
                return res.json(cached);
            }

            // Busca do banco
            const comandos = await model.find()
                .select('-__v') // Remove campo __v
                .lean() // Converte para objeto simples (mais rápido)
                .maxTimeMS(5000); // Timeout de 5 segundos

            // Armazena no cache
            setCache(cacheKey, comandos);
            
            res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
            res.json(comandos);
        } catch (err) {
            console.error(`Erro ao buscar comandos ${categoria}:`, err.message);
            res.status(500).json({ 
                error: 'Erro ao buscar comandos',
                message: 'Tente novamente em instantes'
            });
        }
    });

    // Buscar por ID com validação
    app.get(`/api/v1/comandos/${categoria}/:id`, async (req, res) => {
        const cacheKey = `comando_${categoria}_${req.params.id}`;
        
        try {
            // Valida formato do ID
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
                return res.status(400).json({ error: 'ID inválido' });
            }

            // Verifica cache
            const cached = getFromCache(cacheKey);
            if (cached) {
                return res.json(cached);
            }

            const comando = await model.findById(req.params.id)
                .select('-__v')
                .lean()
                .maxTimeMS(5000);
                
            if (!comando) {
                return res.status(404).json({ error: 'Comando não encontrado' });
            }

            // Armazena no cache
            setCache(cacheKey, comando);
            
            res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=300');
            res.json(comando);
        } catch (err) {
            console.error(`Erro ao buscar comando ${categoria}:`, err.message);
            res.status(500).json({ 
                error: 'Erro ao buscar comando',
                message: 'Tente novamente em instantes'
            });
        }
    });

}

// CRUD para cada categoria
createComandoCrudRoutes(ComandoArquivo, 'arquivos');
createComandoCrudRoutes(ComandoSistema, 'sistema');
createComandoCrudRoutes(ComandoRede, 'rede');
createComandoCrudRoutes(ComandoPacote, 'pacotes');
createComandoCrudRoutes(ComandoUtil, 'util');

// Endpoint de health check
app.get('/api/health', (req, res) => {
    const status = {
        status: 'ok',
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    };
    res.json(status);
});

// Handler 404 para rotas não encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint não encontrado' });
});

// Handler de erros global
app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err);
    res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Tente novamente'
    });
});

// Inicialização
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM recebido, encerrando...');
    server.close(() => {
        mongoose.connection.close(false, () => {
            console.log('Conexões fechadas');
            process.exit(0);
        });
    });
});

module.exports = app;
