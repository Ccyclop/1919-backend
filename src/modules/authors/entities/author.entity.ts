import { S3Entity } from "@src/modules/S3/entity/S3.entity";
import { Album } from "src/modules/album/entities/album.entity";
import { CreateMusicDto } from "src/modules/musics/dto/create-music.dto";
import { MusicEntity } from "src/modules/musics/entities/music.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @ManyToOne(() => S3Entity, )
    @JoinColumn({ name: 'photoId' })
    photo?: S3Entity
}
