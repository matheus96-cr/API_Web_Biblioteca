// src/database/data-source.ts

import "reflect-metadata"; // Import necessário para o TypeORM funcionar com decoradores
import { DataSource } from "typeorm";
import { Livro } from "../entity/Livro";

/**
 * Configuração da Fonte de Dados (Database Connection)
 */
export const AppDataSource = new DataSource({
    // Utilizamos SQLite (o banco de dados será um arquivo chamado 'database.sqlite')
    type: "sqlite",
    database: "database.sqlite",
    
    // Lista de entidades que o TypeORM deve reconhecer e mapear
    entities: [Livro],
    
    // Automaticamente sincroniza o esquema do DB com as entidades (apenas para DEV)
    synchronize: true,
    
    // Desativa logs de queries SQL no console
    logging: false, 
});

/**
 * Função para inicializar o banco de dados
 */
export async function initializeDatabase() {
    try {
        // Tenta estabelecer a conexão
        await AppDataSource.initialize();
        console.log("Data Source inicializado com sucesso!");
    } catch (error) {
        console.error("Erro durante a inicialização do Data Source:", error);
    }
}