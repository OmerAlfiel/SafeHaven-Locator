import { Controller, Post, Body, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateShelterReportDto } from './dto/create-shelter-report.dto';
import { CreateUnsafeConditionDto } from './dto/create-unsafe-condition.dto';
import { CreateReviewRatingDto } from './dto/create-review-rating.dto';


@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('shelter')
  createShelterReport(@Body() createShelterReportDto: CreateShelterReportDto) {
    return this.reportsService.createShelterReport(createShelterReportDto);
  }

  @Post('unsafe-condition')
  createUnsafeCondition(@Body() createUnsafeConditionDto: CreateUnsafeConditionDto) {
    return this.reportsService.createUnsafeCondition(createUnsafeConditionDto);
  }

  @Post('review')
  createReviewRating(@Body() createReviewRatingDto: CreateReviewRatingDto) {
    return this.reportsService.createReviewRating(createReviewRatingDto);
  }

  @Get('shelters')
  getAllShelterReports() {
    return this.reportsService.getAllShelterReports();
  }

  @Get('unsafe-conditions')
  getAllUnsafeConditions() {
    return this.reportsService.getAllUnsafeConditions();
  }

  @Get('reviews')
  getAllReviewRatings() {
    return this.reportsService.getAllReviewRatings();
  }
}