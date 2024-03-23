import {
  Entity,
  Column,
  BeforeInsert,
  BeforeUpdate,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import { Advertisment } from './advertisment.entity';
import { UserAdvertismentStatus } from '../enum/userAdvertisment.enum';

@Entity('users_advertisments')
export class UserAdvertisment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @BeforeInsert()
  createUUID() {
    this.id = uuid();
  }

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user' })
  user?: User;

  @ManyToOne(() => Advertisment, (advertisment) => advertisment.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'advertisement' })
  advertisment?: Advertisment;

  @Column({ name: 'send_to', nullable: true, default: null })
  sendTo: string;

  @Column({
    type: 'enum',
    enum: UserAdvertismentStatus,
    default: UserAdvertismentStatus.SEND,
  })
  status: UserAdvertismentStatus;

  @Column({ type: 'datetime', name: 'sended_at' })
  sendedAt: Date;

  @BeforeInsert()
  insertSendedAt() {
    this.sendedAt = new Date();
  }

  @Column({
    type: 'datetime',
    name: 'updated_at',
    nullable: true,
    default: null,
  })
  updatedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
