// src/index.ts

import "reflect-metadata"; // Import obrigatório para o TypeORM funcionar
import express, { Request, Response } from "express";
import { initializeDatabase } from "./database/data-source";
import { LivroController } from "./controller/LivroController";

// Instancia o Express e o Controller
const app = express();
const livroController = new LivroController();
const PORT = 3000; // Define a porta de execução da API

// Configura o middleware para processar requisições com corpo JSON
app.use(express.json());

// --- ROTAS DA ENTIDADE LIVRO (Endpoints CRUD) ---
const BASE_PATH = "/api/livros";

// [Criar] POST /api/livros: Cadastra um novo livro
app.post(BASE_PATH, (req: Request, res: Response) => 
    livroController.create(req, res)
);

// [Ler Todos] GET /api/livros: Retorna a lista completa de livros
app.get(BASE_PATH, (req: Request, res: Response) => 
    livroController.findAll(req, res)
);

// [Ler por ID] GET /api/livros/{id}: Retorna os detalhes de um livro específico
app.get(`${BASE_PATH}/:id`, (req: Request, res: Response) => 
    livroController.findById(req, res)
);

// [Atualizar] PUT /api/livros/{id}: Atualiza todas ou parte das informações de um livro
app.put(`${BASE_PATH}/:id`, (req: Request, res: Response) => 
    livroController.update(req, res)
);

// [Excluir] DELETE /api/livros/{id}: Remove um livro do sistema
app.delete(`${BASE_PATH}/:id`, (req: Request, res: Response) => 
    livroController.delete(req, res)
);

// --- INICIALIZAÇÃO DO SERVIDOR ---

// Tenta conectar ao banco de dados e, se for bem-sucedido, inicia o servidor Express
initializeDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
            console.log(`API Web Biblioteca iniciada. Teste os endpoints em http://localhost:${PORT}${BASE_PATH}`);
        });
    })
    .catch((error) => {
        console.error("Falha ao iniciar a API devido a um erro de banco de dados:", error);
        process.exit(1); // Encerra o processo se a conexão com o DB falhar
    });