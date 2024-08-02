import { Album } from "src/album/entities/album.entity";
import { Author } from "src/authors/entities/author.entity";
import { View } from "src/views/entities/view.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Music {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'int', nullable: true})
    authorId: number;

    @ManyToOne(() => Author, (author) => author.musics)
    author: Author;

    @ManyToOne(() => Album, (album) => album.musics)
    album: Album;

    @OneToOne(() => View, (view) => view.music)
    @JoinColumn()
    views: View;

    @Column({type: 'int'})
    duration: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

}
