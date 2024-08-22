import { Album } from '@src/modules/album/entities/album.entity';
import { MusicEntity } from '@src/modules/musics/entities/music.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { S3Type } from '../enum/S3.enum';

@Entity()
export class S3Entity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  mimetype: string;

  @Column()
  type: S3Type; 

  @CreateDateColumn({ type: 'timestamp' })
  releaseDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
  
}