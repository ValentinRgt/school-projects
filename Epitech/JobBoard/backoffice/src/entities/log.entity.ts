import { LogInterface } from 'src/modules/log/log.interface';
import { Entity, PrimaryGeneratedColumn, BeforeInsert, Column } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('logs')
export class Log {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @BeforeInsert()
  createUUID() {
    this.id = uuid();
  }

  @Column()
  type: string;

  @Column({ type: 'json' })
  options: LogInterface;

  @Column({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @BeforeInsert()
  insertCreatedAt() {
    this.createdAt = new Date();
  }
}
