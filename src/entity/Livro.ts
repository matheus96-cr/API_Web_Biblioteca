// src/entity/Livro.ts

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("livros")
export class Livro {
    
    // O ID é gerado, então ele não é fornecido no construtor. Use '!'
    @PrimaryGeneratedColumn()
    id!: number; // O '!' diz ao TS que o TypeORM irá inicializá-lo

    @Column({ length: 150 })
    titulo!: string; // Título do livro é obrigatório 

    @Column({ length: 100 })
    autor!: string; // Nome do autor principal é obrigatório [cite: 10]

    @Column({ length: 20, unique: true })
    isbn!: string; // ISBN é obrigatório [cite: 11]

    @Column("int")
    anoPublicacao!: number; // Ano de Publicação é obrigatório [cite: 12]

    // 'disponivel' tem um valor padrão (default: true) e é um booleano [cite: 13]
    @Column({ default: true }) 
    disponivel!: boolean;
}