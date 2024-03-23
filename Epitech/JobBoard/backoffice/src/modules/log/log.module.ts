import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from 'src/entities/log.entity';

@Module({
  providers: [LogService],
  exports: [LogService],
  imports: [TypeOrmModule.forFeature([Log])],
})
export class LogModule {}
