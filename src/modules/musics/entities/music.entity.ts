import { Audio } from "@src/modules/audio/entity/audio.entity";
import { S3Entity } from "@src/modules/media/entity/S3.entity";
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

    @ManyToOne(() => S3Entity, )
    @JoinColumn({ name: 'photoId' })
    photo: S3Entity;

    @ManyToOne(() => S3Entity, )
    @JoinColumn({ name: 'audioId' })
    audio?: S3Entity;
  
  

}
