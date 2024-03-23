import {
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import slugify from 'slugify';
import { UserAdvertisment } from './userAdvertisment.entity';
import { Company } from './company.entity';

@Entity('advertisments')
export class Advertisment {
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

  @Column({ type: 'text', nullable: true })
  description?: string;

  @ManyToOne(() => Company, (company) => company.id, { onDelete: 'CASCADE' })
  company: Company;

  @OneToMany(
    () => UserAdvertisment,
    (userAdvertisment) => userAdvertisment.advertisment,
    {
      onDelete: 'CASCADE',
    },
  )
  advertisments: UserAdvertisment[];

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
