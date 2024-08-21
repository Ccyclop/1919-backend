import { Album } from '@src/modules/album/entities/album.entity';
import { MusicEntity } from '@src/modules/musics/entities/music.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class S3Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  mimetype: string;

  @Column()
  type: 'audio' | 'photo'; 

  @CreateDateColumn({ type: 'timestamp' })
  releaseDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
  
}