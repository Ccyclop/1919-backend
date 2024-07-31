import { Album } from "src/album/entities/album.entity";
import { CreateMusicDto } from "src/musics/dto/create-music.dto";
import { MusicEntity } from "src/musics/entities/music.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Author {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    firstName: string;

    @Column({type: 'varchar'})
    lastName: string;

    @OneToMany(() => MusicEntity, (music) => music.author)
    musics: MusicEntity[];

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
