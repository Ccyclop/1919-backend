import { ColdObservable } from "rxjs/internal/testing/ColdObservable";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Music {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'int'})
    artistId: number;

    // @ManyToOne(() => Artist, (artist) => artist.musics)
    // artist: Artist;
    // ჯერჯერობით არ შემიქმნია არტისტის მოდული ასე რომ დავაკომენტარებ

    @Column({type: 'int'})
    duration: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

}
