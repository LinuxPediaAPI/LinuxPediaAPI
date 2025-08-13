require("dotenv").config(); // Adicione esta linha no topo

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Conectar ao MongoDB usando variável de ambiente
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Conectado ao MongoDB"))
    .catch((err) => console.error("❌ Erro ao conectar:", err));

// Model
const ApiModel = mongoose.model("API", {
    command: String,
    description: String,
    example: String,
    category: String // Adicionado para categorizar os comandos
});


// Rotas de comandos organizadas por categoria
// Cada rota pode ser implementada por um responsável diferente

// =================== ARQUIVOS ===================

// GET http://localhost:3000/api/v1/comandos/arquivos
// Responsável: Vitor
app.get("/api/v1/comandos/arquivos", async (req, res) => {
    try {
        const comandosArquivos = await ApiModel.find({ categoria: "arquivos" });
        res.json(comandosArquivos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST http://localhost:3000/api/v1/comandos/arquivos
app.post("/api/v1/comandos/arquivos", async (req, res) => {
    try {
        const novoComando = new ApiModel({ ...req.body, categoria: "arquivos" });
        await novoComando.save();
        res.status(201).json(novoComando);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT http://localhost:3000/api/v1/comandos/arquivos/:id
app.put("/api/v1/comandos/arquivos/:id", async (req, res) => {
    try {
        const comandoAtualizado = await ApiModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(comandoAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE http://localhost:3000/api/v1/comandos/arquivos/:id
app.delete("/api/v1/comandos/arquivos/:id", async (req, res) => {
    try {
        await ApiModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Comando removido com sucesso." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// =================== SISTEMA ===================

// GET http://localhost:3000/api/v1/comandos/sistema
// Responsável: Nathan
app.get("/api/v1/comandos/sistema", async (req, res) => {
    try {
        const comandosSistema = await ApiModel.find({ categoria: "sistema" });
        res.json(comandosSistema);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST http://localhost:3000/api/v1/comandos/sistema
app.post("/api/v1/comandos/sistema", async (req, res) => {
    try {
        const novoComando = new ApiModel({ ...req.body, categoria: "sistema" });
        await novoComando.save();
        res.status(201).json(novoComando);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT http://localhost:3000/api/v1/comandos/sistema/:id
app.put("/api/v1/comandos/sistema/:id", async (req, res) => {
    try {
        const comandoAtualizado = await ApiModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(comandoAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE http://localhost:3000/api/v1/comandos/sistema/:id
app.delete("/api/v1/comandos/sistema/:id", async (req, res) => {
    try {
        await ApiModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Comando removido com sucesso." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// =================== REDE ===================

// GET http://localhost:3000/api/v1/comandos/rede
// Responsável: Alexander
app.get("/api/v1/comandos/rede", async (req, res) => {
    try {
        const comandosRede = await ApiModel.find({ categoria: "rede" });
        res.json(comandosRede);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST http://localhost:3000/api/v1/comandos/rede
app.post("/api/v1/comandos/rede", async (req, res) => {
    try {
        const novoComando = new ApiModel({ ...req.body, categoria: "rede" });
        await novoComando.save();
        res.status(201).json(novoComando);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT http://localhost:3000/api/v1/comandos/rede/:id
app.put("/api/v1/comandos/rede/:id", async (req, res) => {
    try {
        const comandoAtualizado = await ApiModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(comandoAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE http://localhost:3000/api/v1/comandos/rede/:id
app.delete("/api/v1/comandos/rede/:id", async (req, res) => {
    try {
        await ApiModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Comando removido com sucesso." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// =================== PACOTES ===================

// GET http://localhost:3000/api/v1/comandos/pacotes
// Responsável: Vitor
app.get("/api/v1/comandos/pacotes", async (req, res) => {
    try {
        const comandosPacotes = await ApiModel.find({ categoria: "pacotes" });
        res.json(comandosPacotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST http://localhost:3000/api/v1/comandos/pacotes
app.post("/api/v1/comandos/pacotes", async (req, res) => {
    try {
        const novoComando = new ApiModel({ ...req.body, categoria: "pacotes" });
        await novoComando.save();
        res.status(201).json(novoComando);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT http://localhost:3000/api/v1/comandos/pacotes/:id
app.put("/api/v1/comandos/pacotes/:id", async (req, res) => {
    try {
        const comandoAtualizado = await ApiModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(comandoAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE http://localhost:3000/api/v1/comandos/pacotes/:id
app.delete("/api/v1/comandos/pacotes/:id", async (req, res) => {
    try {
        await ApiModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Comando removido com sucesso." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// =================== UTIL ===================

// GET http://localhost:3000/api/v1/comandos/util
// Responsável: Nathan
app.get("/api/v1/comandos/util", async (req, res) => {
    try {
        const comandosUtil = await ApiModel.find({ categoria: "util" });
        res.json(comandosUtil);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST http://localhost:3000/api/v1/comandos/util
app.post("/api/v1/comandos/util", async (req, res) => {
    try {
        const novoComando = new ApiModel({ ...req.body, categoria: "util" });
        await novoComando.save();
        res.status(201).json(novoComando);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT http://localhost:3000/api/v1/comandos/util/:id
app.put("/api/v1/comandos/util/:id", async (req, res) => {
    try {
        const comandoAtualizado = await ApiModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(comandoAtualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE http://localhost:3000/api/v1/comandos/util/:id
app.delete("/api/v1/comandos/util/:id", async (req, res) => {
    try {
        await ApiModel.findByIdAndDelete(req.params.id);
        res.json({ message: "Comando removido com sucesso." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Iniciar servidor
export default app;
