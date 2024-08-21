import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

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
}