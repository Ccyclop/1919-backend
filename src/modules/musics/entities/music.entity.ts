import { Album } from "src/modules/album/entities/album.entity";
import { Author } from "src/modules/authors/entities/author.entity";
import { playlistEntity } from "src/modules/playlist/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MusicEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'int', nullable: true})
    authorId: number;

    @ManyToOne(() => Author, (author) => author.musics)
    author: Author;

    @ManyToOne(() => Album, (album) => album.musics)
    album: Album;
    
    @Column({type: 'int'})
    duration: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToMany(() => playlistEntity, (playlist) => playlist.musics)
    playlists: playlistEntity[];

}
