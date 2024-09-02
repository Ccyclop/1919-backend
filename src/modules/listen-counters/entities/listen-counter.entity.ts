import { MusicEntity } from "@src/modules/musics/entities/music.entity";
import { User } from "@src/modules/user/entity/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ListenCounterEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'int', default: null})
    userId: number;

    @ManyToOne(() => User, (user) => user.listens)
    @JoinColumn()
    user: User;

    @Column({type: 'int'})
    musicId: number;

    @ManyToOne(() => MusicEntity, (music) => music.listens)
    music: MusicEntity;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
