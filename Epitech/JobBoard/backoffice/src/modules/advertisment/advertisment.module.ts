import { Module, forwardRef } from '@nestjs/common';
import { AdvertismentService } from './advertisment.service';
import { AdvertismentController } from './advertisment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisment } from '../../entities/advertisment.entity';
import { PaginationService } from 'src/service/pagination.service';
import { UserModule } from '../user/user.module';
import { LogModule } from '../log/log.module';
import { UserAdvertisment } from 'src/entities/userAdvertisment.entity';

@Module({
  providers: [AdvertismentService, PaginationService],
  exports: [AdvertismentService],
  controllers: [AdvertismentController],
  imports: [
    TypeOrmModule.forFeature([Advertisment, UserAdvertisment]),
    forwardRef(() => UserModule),
    forwardRef(() => LogModule),
  ],
})
export class AdvertismentModule {}
