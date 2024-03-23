import { Module, forwardRef } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '../../entities/company.entity';
import { PaginationService } from 'src/service/pagination.service';
import { UserModule } from '../user/user.module';
import { LogModule } from '../log/log.module';
import { UserAdvertisment } from 'src/entities/userAdvertisment.entity';

@Module({
  providers: [CompanyService, PaginationService],
  exports: [CompanyService],
  controllers: [CompanyController],
  imports: [
    TypeOrmModule.forFeature([Company, UserAdvertisment]),
    forwardRef(() => UserModule),
    forwardRef(() => LogModule),
  ],
})
export class CompanyModule {}
