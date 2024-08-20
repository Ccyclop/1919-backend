import {
Entity,
Column,
PrimaryGeneratedColumn,
ManyToOne,
JoinTable,
ManyToMany,
CreateDateColumn,
OneToMany,
JoinColumn,
UpdateDateColumn,
DeleteDateColumn,
Auth,
OneToOne,
} from 'typeorm';

import { Author } from 'src/modules/authors/entities/author.entity';
import { MusicEntity } from 'src/modules/musics/entities/music.entity';
import { Photo } from '@src/modules/photo/entity/photo.entity';
import { Audio } from '@src/modules/audio/entity/audio.entity';
  
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
  authorId: number

  @ManyToOne(() => Author, (author) => author.albums)
  author: Author; 

  @OneToMany(() => MusicEntity, (music) => music.album, { cascade: true })
  musics: MusicEntity[];

  @OneToOne(() => Photo,photo => photo.album)
  @JoinColumn()
  photo:Photo

  @OneToOne(() => Audio,Audio => Audio.album)
  @JoinColumn()
  audio: Audio
}