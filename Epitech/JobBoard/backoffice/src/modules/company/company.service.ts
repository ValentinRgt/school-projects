import { Injectable } from '@nestjs/common';
import { Company } from '../../entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { PaginationService } from 'src/service/pagination.service';
import { createCompanyDTO } from './company.dto';
import { LogService } from '../log/log.service';
import { LogType } from 'src/enum/logType.enum';
import { PaginationDTO } from 'src/DTO/pagination.dto';
import { UserAdvertisment } from 'src/entities/userAdvertisment.entity';
import { UserAdvertismentStatus } from 'src/enum/userAdvertisment.enum';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(UserAdvertisment)
    private readonly userAdvertismentRepository: Repository<UserAdvertisment>,
    private readonly paginationService: PaginationService,
    private readonly logService: LogService,
  ) {}

  /**
   * @param {Partial} data<Partial<Company>>
   * @returns Promise<Company>
   */
  async create(data: Partial<Company>): Promise<Company> {
    const company = this.companyRepository.create(data);
    return await this.companyRepository.save(company);
  }

  /**
   * @returns Promise<number>
   */
  async count(): Promise<number> {
    return await this.companyRepository.count();
  }

  /**
   * @param {Partial} data<Partial<createCompanyDTO>>
   * @returns Promise<Company>
   */
  async findOrCreate(data: Partial<createCompanyDTO>): Promise<any> {
    const company = await this.companyRepository.findOne({
      where: [{ name: data.name }, { siret: data.siret }],
    });
    if (company) {
      return {
        status: false,
        company: company,
      };
    }
    const companyAfterCreation = await this.create(data);
    await this.logService.insertLog(LogType.COMPANY_CREATE, {
      companyId: companyAfterCreation.id,
    });
    return { status: true, company: companyAfterCreation };
  }

  /**
   * @returns Promise<any>
   */
  async findAllCompanies(page: number, limit: number): Promise<any> {
    const data = await this.companyRepository
      .createQueryBuilder()
      .select('*')
      .orderBy('RAND()')
      .take(limit)
      .skip(page)
      .execute();
    const totalRows = await this.companyRepository.count();

    return await this.paginationService.paginate(data, totalRows, page, limit);
  }

  /**
   * @param {string} companyIdentifier
   * @returns Promise<Company>
   */
  async findOneByIdOrSlug(
    companyIdentifier: string,
    relations: string[] = [],
  ): Promise<Company> {
    return await this.companyRepository.findOne({
      select: { users: { id: true, firstname: true, lastname: true } },
      where: [{ id: companyIdentifier }, { slug: companyIdentifier }],
      relations: relations,
    });
  }

  /**
   * @param {string} companyName
   * @returns Promise<Company[]>
   */
  async findByName(companyName: string): Promise<Company[]> {
    return await this.companyRepository.find({
      select: { users: { id: true, firstname: true, lastname: true } },
      where: [{ name: ILike(`%${companyName}%`) }],
      relations: ['users'],
    });
  }

  /**
   * @param {@PaginationDTO} query
   * @returns {@Promise<Company[]>}
   */
  async findBy(query: PaginationDTO): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  /**
   * @param {string} companySlug
   * @param {@PaginationDTO} query
   * @returns {@Promise<Company>}
   */
  async findAdvertismentByCompany(
    companySlug: string,
    query: PaginationDTO,
  ): Promise<Company> {
    return await this.companyRepository.findOne({
      where: { slug: companySlug },
      relations: ['advertisments'],
    });
  }

  /**
   * @param {string} companySlug
   * @returns Promise<void>
   */
  async deleteCompany(companySlug: string): Promise<void> {
    const company = await this.companyRepository.findOne({
      where: { slug: companySlug },
    });
    await this.logService.insertLog(LogType.COMPANY_DELETE, {
      companyId: company.id,
    });
    await this.companyRepository.delete({ id: company.id });
  }

  /**
   * @param {Company} company
   * @returns Promise<any>
   */
  async findCandidatesByCompany(company: Company): Promise<any> {
    return await this.companyRepository.find({
      where: { id: company.id },
      relations: [
        'advertisments',
        'advertisments.advertisments',
        'advertisments.advertisments.user',
      ],
    });
  }

  /**
   * @param {string} id
   * @returns Promise<any>
   */
  async updateCandidate(id: string): Promise<any> {
    return await this.userAdvertismentRepository.save({
      id: id,
      status: UserAdvertismentStatus.VIEWED,
    });
  }
}
