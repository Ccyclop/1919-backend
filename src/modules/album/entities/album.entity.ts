import {
Entity,
Column,
PrimaryGeneratedColumn,
ManyToOne,
CreateDateColumn,
OneToMany,
JoinColumn,
UpdateDateColumn,
DeleteDateColumn,
} from 'typeorm';

import { Author } from 'src/modules/authors/entities/author.entity';
import { MusicEntity } from 'src/modules/musics/entities/music.entity';
import { S3Entity } from '@src/modules/S3/entity/S3.entity';
import { IsNumber } from 'class-validator';
  
@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @CreateDateColumn({ type: 'timestamp' })
  releaseDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @Column()
  authorName: string

  @ManyToOne(() => Author, (author) => author.albums)
  author: Author; 

  @OneToMany(() => MusicEntity, (music) => music.album, { cascade: true })
  musics: MusicEntity[];

  @ManyToOne(() => S3Entity, )
  @JoinColumn({ name: 'photoId' })
  photo: S3Entity

}