import { S3Entity } from "@src/modules/S3/entity/S3.entity";
import { ListenCounterEntity } from "@src/modules/listen-counters/entities/listen-counter.entity";
import { Album } from "src/modules/album/entities/album.entity";
import { Author } from "src/modules/authors/entities/author.entity";
import { playlistEntity } from "src/modules/playlist/entities/playlist.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MusicEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string

    @ManyToOne(() => Author, (author) => author.musics)
    author: Author;

    @Column()
    authorName: string

    @ManyToOne(() => Album, (album) => album.musics)
    album: Album;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    @ManyToMany(() => playlistEntity, (playlist) => playlist.musics)
    playlists: playlistEntity[];

    @ManyToOne(() => S3Entity, )
    @JoinColumn({ name: 'photoId' })
    photo: S3Entity;

    @ManyToOne(() => S3Entity, )
    @JoinColumn({ name: 'audioId' })
    audio?: S3Entity;
  
    @OneToMany(() => ListenCounterEntity, listenCounter => listenCounter.music)
    listens: ListenCounterEntity[];

}
