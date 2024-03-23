import {
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  Column,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './user.entity';
import slugify from 'slugify';
import { Advertisment } from './advertisment.entity';
import { defaultImage } from 'src/enum/defaultImage.enum';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @BeforeInsert()
  createUUID() {
    this.id = uuid();
  }

  @Column()
  name: string;

  @Column()
  slug: string;

  @BeforeInsert()
  createSlug() {
    this.slug = slugify(this.name, { lower: true });
  }

  @BeforeUpdate()
  updateSlug() {
    this.slug = slugify(this.name, { lower: true });
  }

  @Column()
  siret: string;

  @Column()
  website: string;

  @Column()
  address: string;

  @Column({ type: 'text', default: defaultImage.COMPANY_LOGO })
  image: string;

  @Column({ type: 'text', nullable: true, default: null })
  description?: string;

  @OneToMany(() => User, (user) => user.company, { onDelete: 'CASCADE' })
  users: User[];

  @OneToMany(() => Advertisment, (advertisment) => advertisment.company, {
    onDelete: 'CASCADE',
  })
  advertisments: Advertisment[];

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
