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
} from 'typeorm';

import { Author } from 'src/modules/authors/entities/author.entity';
import { MusicEntity } from 'src/modules/musics/entities/music.entity';
  
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
}