import { Album } from "@src/modules/album/entities/album.entity";
import { MusicEntity } from "@src/modules/musics/entities/music.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

//   @OneToOne(() => MusicEntity, music => music.audio)
//   music: MusicEntity;

//   @OneToOne(() => Album, music => music.audio)
  
//   album: Album;

}