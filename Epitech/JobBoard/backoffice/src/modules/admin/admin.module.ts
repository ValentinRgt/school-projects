import { Module, forwardRef } from '@nestjs/common';
import { PaginationService } from 'src/service/pagination.service';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { CompanyModule } from '../company/company.module';
import { AdvertismentModule } from '../advertisment/advertisment.module';
import { UserModule } from '../user/user.module';
import { LogModule } from '../log/log.module';

@Module({
  providers: [AdminService, PaginationService],
  exports: [AdminService],
  controllers: [AdminController],
  imports: [
    forwardRef(() => CompanyModule),
    forwardRef(() => UserModule),
    forwardRef(() => AdvertismentModule),
    forwardRef(() => LogModule),
  ],
})
export class AdminModule {}
