import { User } from '@src/modules/user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class S3History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  S3Url: string;

  @Column()
  bucketUrl: string;

  @Column()
  key: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User,User => User.s3Histories)
  user:User
}