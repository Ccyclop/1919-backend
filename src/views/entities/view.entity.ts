import { Music } from "src/musics/entities/music.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class View {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Music, (music) => music.views)
    music: Music;

    @Column({type: 'int', default: 0})
    count: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
