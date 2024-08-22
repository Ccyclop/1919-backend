import { User } from '@src/modules/user/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

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

  @Column({nullable: true})
  userId: number;

  @ManyToOne(() => User, user => user.s3Histories)
  @JoinColumn({ name: 'userId' }) 
  user: User;

}