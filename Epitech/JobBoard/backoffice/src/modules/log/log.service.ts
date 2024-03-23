import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from 'src/entities/log.entity';
import { LogInterface } from './log.interface';
import { Repository } from 'typeorm';
import { LogType } from 'src/enum/logType.enum';
import { PaginationDTO } from 'src/DTO/pagination.dto';
import { log } from 'console';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  /**
   * @param {string} type
   * @param {LogInterface} options
   * @returns {Promise<any>}
   */
  async insertLog(type: LogType, options: LogInterface): Promise<any> {
    const log = this.logRepository.create({ type, options });
    return await this.logRepository.save(log);
  }

  /**
   * @param {@PaginationDTO} query
   * @returns {@Promise<any>}
   */
  async findBy(query: PaginationDTO): Promise<any> {
    return await this.logRepository.find();
  }
}
