import { CreateMusicDto } from "src/musics/dto/create-music.dto";
import { Music } from "src/musics/entities/music.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    firstName: string;

    @Column({type: 'varchar'})
    lastName: string;

    @OneToMany(() => Music, (music) => music.author)
    musics: CreateMusicDto[];

    @Column({type: "longtext"})
    biography: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
