import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CompanyService } from '../company/company.service';
import { AdvertismentService } from '../advertisment/advertisment.service';
import { PaginationDTO } from 'src/DTO/pagination.dto';
import { UserDTO } from '../user/user.dto';
import { LogService } from '../log/log.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly companyService: CompanyService,
    private readonly advertismentService: AdvertismentService,
    private readonly logService: LogService,
  ) {}

  /**
   * @returns {@Promise<any>}
   */
  async getStats(): Promise<any> {
    return {
      users: await this.userService.count(),
      advertisments: await this.advertismentService.count(),
      companies: await this.companyService.count(),
    };
  }

  /**
   * @param {@PaginationDTO} query
   * @returns {@Promise<any>}
   */
  async getUsers(query: PaginationDTO): Promise<any> {
    return await this.userService.findBy(query);
  }

  /**
   * @param {string} id
   * @returns {@Promise<any>}
   */
  async getUserData(id: string): Promise<any> {
    return await this.userService.findOneById(id, [
      'company',
      'advertisments',
      'advertisments.advertisment',
      'advertisments.advertisment.company',
    ]);
  }

  /**
   * @param {string} id
   * @returns {@Promise<any>}
   */
  async updateUserData(id: string, user: UserDTO): Promise<any> {
    return await this.userService.setUpdateRole(id, user);
  }

  /**
   * @param {string} id
   * @returns {@Promise<any>}
   */
  async deleteUser(id: string): Promise<any> {
    return await this.userService.deleteUser(id);
  }

  /**
   * @param {@PaginationDTO} query
   * @returns {@Promise<any>}
   */
  async getCompanies(query: PaginationDTO): Promise<any> {
    return await this.companyService.findBy(query);
  }

  /**
   * @param {string} id
   * @returns {@Promise<any>}
   */
  async getCompanyData(id: string): Promise<any> {
    return await this.companyService.findOneByIdOrSlug(id, [
      'users',
      'advertisments',
    ]);
  }

  /**
   * @param {string} id
   * @returns {@Promise<any>}
   */
  async deleteCompany(id: string): Promise<any> {
    return await this.companyService.deleteCompany(id);
  }

  /**
   * @param {@PaginationDTO} query
   * @returns {@Promise<any>}
   */
  async getAdvertisments(query: PaginationDTO): Promise<any> {
    return await this.advertismentService.findBy(query);
  }

  /**
   * @param {string} slug
   * @returns {@Promise<any>}
   */
  async getAdvertismentData(slug: string): Promise<any> {
    return await this.advertismentService.findWithUserAdvert(slug);
  }

  /**
   * @param {string} id
   * @returns {@Promise<any>}
   */
  async deleteAdvertisment(id: string): Promise<any> {
    return await this.advertismentService.deleteAdvertisment(id);
  }

  /**
   * @param {@PaginationDTO} query
   * @returns {@Promise<any>}
   */
  async getLogs(query: PaginationDTO): Promise<any> {
    return await this.logService.findBy(query);
  }
}
