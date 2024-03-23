import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from '../company/company.module';
import { UserAdvertisment } from 'src/entities/userAdvertisment.entity';
import { PaginationService } from 'src/service/pagination.service';
import { LogModule } from '../log/log.module';

@Module({
  providers: [UserService, PaginationService],
  exports: [UserService],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User, UserAdvertisment]),
    forwardRef(() => CompanyModule),
    forwardRef(() => LogModule),
  ],
})
export class UserModule {}
