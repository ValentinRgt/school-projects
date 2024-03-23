import { Injectable } from '@nestjs/common';
import { Advertisment } from '../../entities/advertisment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationService } from 'src/service/pagination.service';
import { PaginationDTO } from 'src/DTO/pagination.dto';
import { UserService } from '../user/user.service';
import { LogType } from 'src/enum/logType.enum';
import { LogService } from '../log/log.service';
import { plainToClass } from 'class-transformer';
import { ApplyAdvertismentDTO } from './advertisment.dto';
import { UserAdvertisment } from 'src/entities/userAdvertisment.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AdvertismentService {
  constructor(
    @InjectRepository(Advertisment)
    private readonly advertismentRepository: Repository<Advertisment>,
    @InjectRepository(UserAdvertisment)
    private readonly userAdvertismentRepository: Repository<UserAdvertisment>,
    private readonly userService: UserService,
    private readonly paginationService: PaginationService,
    private readonly logService: LogService,
    private readonly mailerService: MailerService,
  ) {}

  /**
   * @param {Partial} data<Partial<Advertisment>>
   * @returns Promise<Advertisment>
   */
  async create(data: Partial<Advertisment>): Promise<Advertisment> {
    const advertisment = this.advertismentRepository.create(data);
    return await this.advertismentRepository.save(advertisment);
  }

  /**
   * @param {Partial} data<Partial<Advertisment>>
   * @returns Promise<Advertisment>
   */
  async createAdvertisment(data: Partial<Advertisment>): Promise<Advertisment> {
    return await this.create(plainToClass(Advertisment, data));
  }

  /**
   * @returns Promise<any>
   */
  async findAllAdvertisements(page: number, limit: number): Promise<any> {
    const data = await this.advertismentRepository.find({
      order: { name: 'DESC' },
      relations: ['company'],
      take: limit,
      skip: page,
    });
    const totalRows = await this.advertismentRepository.count();
    return await this.paginationService.paginate(data, totalRows, page, limit);
  }

  /**
   * @returns Promise<number>
   */
  async count(): Promise<number> {
    return await this.advertismentRepository.count();
  }

  /**
   * @param {string} advertisementIdentifier
   * @param {string[]} relations
   * @returns Promise<Advertisement>
   */
  async findOneByIdOrSlug(
    advertisementIdentifier: string,
    relations: string[] = ['company'],
  ): Promise<Advertisment> {
    return await this.advertismentRepository.findOne({
      where: [
        { id: advertisementIdentifier },
        { slug: advertisementIdentifier },
      ],
      relations: relations,
    });
  }

  /**
   * @param {@PaginationDTO} query
   * @returns {@Promise<any>}
   */
  async findAllCandidates(query: PaginationDTO): Promise<any> {
    return await this.userService.findAllCandidates(query);
  }

  /**
   * @param {string} identifier
   * @returns {@Promise<any>}
   */
  async getCandidate(identifier: string): Promise<any> {
    return await this.userService.getCandidate(identifier);
  }

  /**
   * @param {@PaginationDTO} query
   * @returns {@Promise<any>}
   */
  async findBy(query: PaginationDTO): Promise<any> {
    return await this.advertismentRepository.find({
      relations: ['company'],
    });
  }

  /**
   * @param {string} slug
   * @returns {@Promise<any>}
   */
  async findWithUserAdvert(slug: string): Promise<any> {
    return await this.advertismentRepository.findOne({
      where: { slug: slug },
      relations: ['company', 'advertisments', 'advertisments.user'],
    });
  }

  /**
   * @param {string} slug
   * @returns Promise<void>
   */
  async deleteAdvertisment(slug: string): Promise<void> {
    const advertisment = await this.advertismentRepository.findOne({
      where: { slug: slug },
    });
    await this.logService.insertLog(LogType.ADVERTISMENT_DELETE, {
      advertismentId: advertisment.id,
    });
    await this.advertismentRepository.delete({ id: advertisment.id });
  }

  async applyAdvertisment(
    advertisment: Advertisment,
    data: ApplyAdvertismentDTO,
  ): Promise<any> {
    const user = await this.userService.findByEmail(data.email);

    const userAdvertisment = this.userAdvertismentRepository.create({
      advertisment: advertisment,
      sendTo: data.email,
      user: user,
    });

    await this.logService.insertLog(LogType.ADVERTISMENT_APPLY, {
      advertismentId: advertisment.id,
      userId: user !== null ? user.id : null,
    });

    await this.userAdvertismentRepository.save(userAdvertisment);

    advertisment.company.users.forEach((user) => {
      this.mailerService
        .sendMail({
          to: user.email,
          subject: 'A new application has just been received',
          text:
            'Hello, We would like to inform you that a candidate has applied for the position of ' +
            advertisment.name,
          html:
            'Hello, We would like to inform you that a candidate has applied for the position of ' +
            advertisment.name,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    this.mailerService
      .sendMail({
        to: data.email,
        subject: 'Your application for ' + advertisment.name,
        text:
          'Hello, We would like to inform you that your application has been sent to the company ' +
          advertisment.company.name,
        html:
          'Hello, We would like to inform you that your application has been sent to the company ' +
          advertisment.company.name,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
