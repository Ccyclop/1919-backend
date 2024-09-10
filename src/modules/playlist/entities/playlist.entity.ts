import { MusicEntity } from "src/modules/musics/entities/music.entity";
import { User } from "@src/modules/user/entity/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import multer from "multer";
import { S3Entity } from "@src/modules/S3/entity/S3.entity";
import { IsNumber } from "class-validator";

@Entity()
export class playlistEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany( () => MusicEntity, music => music.playlists)
    @JoinTable({
        name: 'playlist_music',
        joinColumn: { name: 'playlist_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'music_id', referencedColumnName: 'id' }
      })
    musics: MusicEntity[]

    @Column({type: 'int', default: null})
    userId: number

    @ManyToOne(() => User,user => user.playlists)
    user: User

    @CreateDateColumn({ type: 'timestamp' })
    releaseDate: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
  
    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt?: Date;

    @ManyToOne(() => S3Entity, )
    @JoinColumn({ name: 'photoId' })
    photo?: S3Entity

    @Column({ type: 'int', default: 0 })
    @IsNumber()
    count: number;

}