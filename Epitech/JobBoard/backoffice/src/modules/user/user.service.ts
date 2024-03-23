import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  UpdateUserInformationDTO,
  UpdateUserProfileDTO,
  UserDTO,
} from './user.dto';
import * as bcrypt from 'bcrypt';
import { Company } from '../../entities/company.entity';
import { UserAdvertisment } from 'src/entities/userAdvertisment.entity';
import { PaginationService } from 'src/service/pagination.service';
import { LogService } from '../log/log.service';
import { LogType } from 'src/enum/logType.enum';
import { PaginationDTO } from 'src/DTO/pagination.dto';
import { unlink } from 'node:fs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserAdvertisment)
    private readonly userAdvertismentRepository: Repository<UserAdvertisment>,
    private readonly paginationService: PaginationService,
    private readonly logService: LogService,
  ) {}

  /**
   * @param {Partial} data<Partial<User>>
   * @returns Promise<User>
   */
  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  /**
   * @returns Promise<number>
   */
  async count(): Promise<number> {
    return await this.userRepository.count();
  }

  /**
   * @param {Partial} data<Partial<UserDTO>>
   * @returns Promise<User>
   */
  async findOrCreate(data: Partial<UserDTO>): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (user) {
      return {
        status: false,
        user: user,
      };
    }
    const userAfterCreate = await this.create(data);
    await this.logService.insertLog(LogType.USER_REGISTER, {
      userId: userAfterCreate.id,
    });
    return { status: true, user: userAfterCreate };
  }

  /**
   * @param {string} email
   * @returns Promise<User>
   */
  async findByEmail(email: string, relations: string[] = []): Promise<User> {
    return await this.userRepository.findOne({
      where: { email: email },
      relations: relations,
    });
  }

  /**
   * @param {string} userId
   * @returns Promise<User>
   */
  async findOneById(userId: string, relations: string[] = []): Promise<User> {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: relations,
    });
  }

  /**
   * @param {string} userId
   * @param {User} data<Partial<UserDTO>>
   * @returns Promise<User>
   */
  async updateUserInformation(
    userId: string,
    data: Partial<UpdateUserInformationDTO>,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    user.firstname = data.firstname;
    user.lastname = data.lastname;
    user.email = data.email;
    user.phone = data.phone;

    await this.logService.insertLog(LogType.USER_UPDATE_INFORMATION, {
      userId: userId,
    });

    return await this.userRepository.save(user);
  }

  /**
   * @param {string} userId
   * @param {User} data<Partial<UserDTO>>
   * @returns Promise<User>
   */
  async updateUserProfile(
    userId: string,
    data: Partial<UpdateUserProfileDTO>,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    user.isPublic = data.isPublic;
    user.description = data.description;

    await this.logService.insertLog(LogType.USER_UPDATE_INFORMATION, {
      userId: userId,
    });

    return await this.userRepository.save(user);
  }

  /**
   * @param {string} userId
   * @param {string} password
   * @returns Promise<User>
   */
  async updatePassword(userId: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    user.password = await bcrypt.hash(password, 10);

    await this.logService.insertLog(LogType.USER_UPDATE_PASSWORD, {
      userId: userId,
    });

    return await this.userRepository.save(user);
  }

  /**
   * @param {string} userId
   * @param {string} password
   * @returns Promise<User>
   */
  async updateUserCurriculumVitae(
    userId: string,
    curriculumVitae: any,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (user.curriculumVitae !== null) {
      unlink('./public/static/cv/' + user.image, (err) => {
        if (err) console.log(err);
        console.log('successfully deleted ./public/static/cv/' + user.image);
      });
    }

    user.curriculumVitae = curriculumVitae.filename;

    await this.logService.insertLog(LogType.USER_UPDATE_CURRICULUM, {
      userId: userId,
    });

    return await this.userRepository.save(user);
  }

  /**
   * @param {string} userId
   * @param {string} password
   * @returns Promise<User>
   */
  async updateUserAvatar(userId: string, image: any): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (user.image !== null) {
      unlink('./public/static/avatar/' + user.image, (err) => {
        if (err) console.log(err);
        console.log(
          'successfully deleted ./public/static/avatar/' + user.image,
        );
      });
    }

    user.image = image.filename;

    await this.logService.insertLog(LogType.USER_UPDATE_AVATAR, {
      userId: userId,
    });

    return await this.userRepository.save(user);
  }

  /**
   * @param {string} userId
   * @param {Company} company
   * @returns Promise<User>
   */
  async setCompany(userId: string, company: Company): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    user.company = company;

    await this.logService.insertLog(LogType.COMPANY_ADD_USER, {
      userId: userId,
      companyId: company.id,
    });

    return await this.userRepository.save(user);
  }

  /**
   * @param {string} userId
   * @returns Promise<void>
   */
  async deleteUser(userId: string): Promise<void> {
    await this.logService.insertLog(LogType.USER_DELETE, {
      userId: userId,
    });
    await this.userRepository.delete({ id: userId });
  }

  /**
   * @param {string} userId
   * @param {string} userEmail
   * @param {number} page
   * @param {number} limit
   * @returns Promise<any>
   */
  async getUserAdvertisments(
    userId: string,
    userEmail: string,
    page: number,
    limit: number,
  ): Promise<any> {
    const advertisements = await this.userAdvertismentRepository.find({
      where: [{ user: { id: userId } }, { user: { email: userEmail } }],
      relations: ['advertisment', 'advertisment.company'],
      order: { sendedAt: 'DESC' },
      take: limit,
      skip: page,
    });

    const totalRows = await this.userAdvertismentRepository.count({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    return await this.paginationService.paginate(
      advertisements,
      totalRows,
      page,
      limit,
    );
  }

  /**
   * @param {@PaginationDTO} query
   * @returns {@Promise<User[]>}
   */
  async findBy(query: PaginationDTO): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['company'],
    });
  }

  /**
   * @param {string} userId
   * @param {UserDTO} userDTO
   * @returns Promise<User>
   */
  async setUpdateRole(userId: string, userDTO: UserDTO): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (typeof userDTO.isAdmin === 'string' && userDTO.isAdmin === 'true') {
      user.isAdmin = true;
    } else if (
      typeof userDTO.isAdmin === 'string' &&
      userDTO.isAdmin === 'false'
    ) {
      user.isAdmin = false;
    }

    await this.logService.insertLog(LogType.ADMIN_UPDATE_USER, {
      userId: userId,
    });

    return await this.userRepository.save(user);
  }

  /**
   * @param {@PaginationDTO} query
   * @returns {@Promise<any>}
   */
  async findAllCandidates(query: PaginationDTO): Promise<any> {
    const data = await this.userRepository.find({
      select: [
        'id',
        'firstname',
        'lastname',
        'image',
        'createdAt',
        'updatedAt',
      ],
      where: { company: null, isPublic: true },
      take: query.limit,
      skip: query.page,
    });
    const totalRows = await this.userRepository.count({
      where: { company: null, isPublic: true },
    });
    return await this.paginationService.paginate(
      data,
      totalRows,
      query.page,
      query.limit,
    );
  }

  /**
   * @param {string} userId
   * @returns Promise<User>
   */
  async getCandidate(userId: string): Promise<User> {
    return await this.userRepository.findOne({
      select: [
        'id',
        'firstname',
        'lastname',
        'phone',
        'image',
        'description',
        'curriculumVitae',
        'createdAt',
        'updatedAt',
      ],
      where: { id: userId, company: null, isPublic: true },
    });
  }
}
