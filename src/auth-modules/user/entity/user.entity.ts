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
import { playlistEntity } from '../../../modules/playlist/entities/playlist.entity';
  


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

    @OneToMany(() => Token, token => token.user)
    tokens: Token[];

    @OneToMany(() => ResetToken,RsToken => RsToken.user)
    resetTokens: ResetToken[]

    @OneToMany(() => playlistEntity,playlist => playlist.user)
    playlists: playlistEntity[]





}