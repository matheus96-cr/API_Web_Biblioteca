// src/repository/LivroRepository.ts

import { AppDataSource } from "../database/data-source";
import { Livro } from "../entity/Livro";
import { Repository } from "typeorm";

/**
 * LivroRepository (Data Access Object - DAO)
 * Responsável por encapsular a lógica de persistência e acesso a dados 
 */
export class LivroRepository {
    private ormRepository: Repository<Livro>;

    constructor() {
        // Obtém o repositório nativo do TypeORM para a entidade Livro
        this.ormRepository = AppDataSource.getRepository(Livro);
    }

    /**
     * Criar/Salvar um novo livro [cite: 24]
     * @param livro Os dados do livro a ser salvo.
     * @returns O livro salvo com o ID gerado.
     */
    async save(livro: Livro): Promise<Livro> {
        return this.ormRepository.save(livro);
    }

    /**
     * Retorna todos os livros [cite: 24]
     */
    async findAll(): Promise<Livro[]> {
        return this.ormRepository.find();
    }

    /**
     * Retorna um livro pelo ID [cite: 24]
     * @param id O ID do livro.
     */
    async findById(id: number): Promise<Livro | null> {
        return this.ormRepository.findOneBy({ id });
    }

    /**
     * Atualiza um livro.
     * O TypeORM save() com ID existente faz o Update.
     * @param livro Os dados atualizados (incluindo o ID).
     * @returns O livro atualizado.
     */
    async update(livro: Livro): Promise<Livro> {
        return this.ormRepository.save(livro);
    }

    /**
     * Remove um livro pelo ID [cite: 24]
     * @param id O ID do livro a ser removido.
     * @returns Um objeto com a informação da remoção.
     */
    async delete(id: number) {
        return this.ormRepository.delete(id);
    }
}