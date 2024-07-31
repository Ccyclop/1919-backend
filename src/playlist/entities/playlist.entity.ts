import { MusicEntity } from "src/musics/entities/music.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class playlistEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany( () => MusicEntity, music => music.playlists)
    @JoinTable({
        name: 'playlist_music',
        joinColumn: { name: 'playlist_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'music_id', referencedColumnName: 'id' }
      })
    musics: MusicEntity[]

    @ManyToOne(() => UserEntity,user => user.playlist)
    user: UserEntity
}