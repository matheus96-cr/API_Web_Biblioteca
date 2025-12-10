// src/controller/LivroController.ts

import { Request, Response } from "express";
import { LivroRepository } from "../repository/LivroRepository";
import { Livro } from "../entity/Livro";

/**
 * LivroController
 * Recebe as requisições HTTP, aplica lógica de negócio/validação e chama o Repository.
 */
export class LivroController {
    private livroRepository: LivroRepository;

    constructor() {
        this.livroRepository = new LivroRepository();
    }

    /**
     * POST /api/livros - Cadastra um novo livro. [cite: 24]
     */
    async create(req: Request, res: Response) {
        const { titulo, autor, isbn, anoPublicacao, disponivel } = req.body;
        
        // **Lógica de Negócio Integrada (Validação Básica)** [cite: 20]
        if (!titulo || !autor || !isbn || !anoPublicacao) {
            return res.status(400).json({ 
                message: "Dados obrigatórios ausentes: título, autor, isbn e anoPublicacao são necessários." 
            });
        }

        try {
            const novoLivro = new Livro();
            // Atribui os dados do body ao objeto Livro
            Object.assign(novoLivro, req.body); 

            // Chama o Repository para salvar no DB [cite: 21]
            const livroSalvo = await this.livroRepository.save(novoLivro);

            return res.status(201).json(livroSalvo);
        } catch (error) {
            console.error(error);
            // Captura erros de DB (ex: ISBN duplicado)
            return res.status(500).json({ message: "Erro ao cadastrar o livro." });
        }
    }

    /**
     * GET /api/livros - Retorna a lista completa de livros. [cite: 24]
     */
    async findAll(req: Request, res: Response) {
        try {
            const livros = await this.livroRepository.findAll();
            return res.json(livros);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar a lista de livros." });
        }
    }

    /**
     * GET /api/livros/{id} - Retorna os detalhes de um livro específico. [cite: 24]
     */
    async findById(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido." });
        }

        try {
            const livro = await this.livroRepository.findById(id);

            if (!livro) {
                return res.status(404).json({ message: "Livro não encontrado." });
            }

            return res.json(livro);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar o livro." });
        }
    }

    /**
     * PUT /api/livros/{id} - Atualiza todas ou parte das informações de um livro. [cite: 24]
     */
    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const updateData = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido." });
        }
        
        try {
            const livroExistente = await this.livroRepository.findById(id);

            if (!livroExistente) {
                return res.status(404).json({ message: "Livro não encontrado para atualização." });
            }

            // O TypeORM Entity.assign faz a fusão dos dados do body com a entidade existente
            Object.assign(livroExistente, updateData);

            const livroAtualizado = await this.livroRepository.update(livroExistente);

            return res.json(livroAtualizado);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar o livro." });
        }
    }

    /**
     * DELETE /api/livros/{id} - Remove um livro do sistema. [cite: 24]
     */
    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido." });
        }

        try {
            const resultado = await this.livroRepository.delete(id);

            // Verifica se alguma linha foi afetada para confirmar a exclusão
            if (resultado.affected === 0) {
                return res.status(404).json({ message: "Livro não encontrado para exclusão." });
            }

            return res.status(204).send(); // 204 No Content para exclusão bem-sucedida
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao excluir o livro." });
        }
    }
}