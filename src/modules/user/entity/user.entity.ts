import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Token } from '../../auth/entity/token.entity';
import { ResetToken } from '../../auth/entity/reset-token.entity';
import { UserRole } from '../../auth/types/role.type';
import { playlistEntity } from '../../playlist/entities/playlist.entity';
import { S3History } from '@src/modules/S3-history/entity/S3-history.entity';
import { ListenCounterEntity } from '@src/modules/listen-counters/entities/listen-counter.entity';
import { FavoriteEntity } from '@src/modules/favorite/entities/favorite.entity';
  


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    email: string;

    @Column()
    hashP: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.guest
    })
    role: UserRole

    @Column({ nullable: true })
    hashedRt:string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at : Date

    @Column({ default: false })
    blocked: boolean;

    @OneToMany(() => Token, token => token.user)
    tokens: Token[];

    @OneToMany(() => ResetToken,RsToken => RsToken.user)
    resetTokens: ResetToken[]

    @OneToMany(() => playlistEntity,playlist => playlist.user)
    playlists: playlistEntity[]

    @OneToMany(() => FavoriteEntity, favorite => favorite.user)
    favorites: FavoriteEntity[];

    @OneToMany(() => S3History,S3History => S3History.user)
    s3Histories: S3History[]

    @OneToMany(() => ListenCounterEntity, listenCounter => listenCounter.user)
    listens: ListenCounterEntity[]

}