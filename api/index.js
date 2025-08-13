
import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// Conexão com MongoDB Atlas (evita múltiplas conexões em ambiente serverless)
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

// Model
const ApiModel = mongoose.models.API || mongoose.model("API", {
  command: String,
  description: String,
  example: String,
  category: String
});

// Rota principal
app.get("/", (req, res) => {
  res.json({ msg: "API rodando!" });
});

// Rotas de comandos organizadas por categoria
// Cada rota pode ser implementada por um responsável diferente

// =================== ARQUIVOS ===================

// GET http://localhost:3000/api/v1/comandos/arquivos
// Responsável: Vitor
app.get("/api/v1/comandos/arquivos", async (req, res) => {
    try {
        const comandosArquivos = await ApiModel.find({ category: "arquivos" });
        res.json(comandosArquivos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST http://localhost:3000/api/v1/comandos/arquivos
app.post("/api/v1/comandos/arquivos", async (req, res) => {
    try {
        const novoComando = new ApiModel({ ...req.body, category: "arquivos" });
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
        const comandosSistema = await ApiModel.find({ category: "sistema" });
        res.json(comandosSistema);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST http://localhost:3000/api/v1/comandos/sistema
app.post("/api/v1/comandos/sistema", async (req, res) => {
    try {
        const novoComando = new ApiModel({ ...req.body, category: "sistema" });
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
        const comandosRede = await ApiModel.find({ category: "rede" });
        res.json(comandosRede);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST http://localhost:3000/api/v1/comandos/rede
app.post("/api/v1/comandos/rede", async (req, res) => {
    try {
        const novoComando = new ApiModel({ ...req.body, category: "rede" });
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
        const comandosPacotes = await ApiModel.find({ category: "pacotes" });
        res.json(comandosPacotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST http://localhost:3000/api/v1/comandos/pacotes
app.post("/api/v1/comandos/pacotes", async (req, res) => {
    try {
        const novoComando = new ApiModel({ ...req.body, category: "pacotes" });
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
        const comandosUtil = await ApiModel.find({ category: "util" });
        res.json(comandosUtil);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST http://localhost:3000/api/v1/comandos/util
app.post("/api/v1/comandos/util", async (req, res) => {
    try {
        const novoComando = new ApiModel({ ...req.body, category: "util" });
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
