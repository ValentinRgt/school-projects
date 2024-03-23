import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Company } from './company.entity';
import { UserAdvertisment } from './userAdvertisment.entity';
import { defaultImage } from 'src/enum/defaultImage.enum';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @BeforeInsert()
  createUUID() {
    this.id = uuid();
  }

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column({ nullable: true, default: null })
  phone: string | null;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @ManyToOne(() => Company, (company) => company.id, { onDelete: 'SET NULL' })
  company: Company;

  @OneToMany(
    () => UserAdvertisment,
    (userAdvertisment) => userAdvertisment.user,
    { onDelete: 'CASCADE' },
  )
  advertisments: UserAdvertisment[];

  @Column({ type: 'text', nullable: true, default: null })
  description?: string;

  @Column({ nullable: true, default: null })
  image?: string;

  @Column({ nullable: true, default: null })
  curriculumVitae?: string;

  @Column({ type: 'boolean', name: 'is_public', default: false })
  isPublic: boolean;

  @Column({ type: 'boolean', name: 'is_admin', default: false })
  isAdmin: boolean;

  @Column({ type: 'datetime', name: 'created_at' })
  createdAt: Date;

  @BeforeInsert()
  insertCreatedAt() {
    this.createdAt = new Date();
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
