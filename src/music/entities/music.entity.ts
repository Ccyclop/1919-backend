import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { Photo } from './photo.entity';
import { Audio } from './audio.entity';
import { Album } from 'src/album/entities/album.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  releaseDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @ManyToOne(() => Author, author => author.musics)
  author: Author;

  @OneToOne(() => Photo)
  @JoinColumn()
  photo: Photo;

  @OneToOne(() => Audio)
  @JoinColumn()
  audio: Audio;

  @ManyToOne(() => Album, (album) => album.musics)
  album: Album;
}