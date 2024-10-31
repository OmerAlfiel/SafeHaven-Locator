import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { ShelterReport } from 'src/reports/entities/shelter-report.entity';
import { UnsafeCondition } from './entities/unsafe-condition.entity';
import { ReviewRating } from './entities/review-rating.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ShelterReport, UnsafeCondition, ReviewRating])],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}