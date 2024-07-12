import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Music } from './music.entity';

@Entity()
export class Photo {
 
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @CreateDateColumn({ type: 'timestamp' })
  releaseDate: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @OneToOne(() => Music, music => music.photo)
  music: Music;
}