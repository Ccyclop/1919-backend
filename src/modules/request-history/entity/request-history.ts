import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class RequestHistory {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255 })
    action: string;
  
    @Column({ type: 'text' })
    details: string;
  
    @CreateDateColumn()
    createdAt: Date;
  }