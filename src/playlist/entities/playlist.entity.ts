import { Music } from "src/musics/entities/music.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class playlistEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany( () => Music, music => music.playlists)
    @JoinTable({
        name: 'playlist_music',
        joinColumn: { name: 'playlist_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'music_id', referencedColumnName: 'id' }
      })
    musics: Music[]
}