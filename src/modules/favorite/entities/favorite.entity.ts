import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '@src/modules/user/entity/user.entity';
import { MusicEntity } from '@src/modules/musics/entities/music.entity';

@Entity()
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.favorites, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => MusicEntity, music => music.favorites, { onDelete: 'CASCADE' })
  music: MusicEntity;
}