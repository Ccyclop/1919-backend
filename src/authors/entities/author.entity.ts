import { Album } from "src/album/entities/album.entity";
import { CreateMusicDto } from "src/music/dtos/create.music.dto";
import { Music } from "src/music/entities/music.entity";
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
    musics: Music[];

    @OneToMany(() => Album, album => album.author)
    albums: Album[];

    @Column({type: "longtext"})
    biography: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
