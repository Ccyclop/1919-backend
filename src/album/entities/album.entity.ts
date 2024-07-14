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

import { Author } from 'src/authors/entities/author.entity';
import { Music } from 'src/musics/entities/music.entity';
  
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

  @ManyToOne(() => Author, (author) => author.albums)
  author: Author; 

  @OneToMany(() => Music, (music) => music.album, { cascade: true })
  musics: Music[];
}