import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Music } from './music.entity';

@Entity()
export class Audio {
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

  @OneToOne(() => Music, music => music.audio)
  music: Music;
  map: any;
}