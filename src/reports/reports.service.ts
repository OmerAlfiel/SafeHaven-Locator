import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { CreateShelterReportDto } from './dto/create-shelter-report.dto';
import { CreateUnsafeConditionDto } from './dto/create-unsafe-condition.dto';
import { CreateReviewRatingDto } from './dto/create-review-rating.dto';
import { ShelterReport } from './entities/shelter-report.entity';
import { UnsafeCondition } from './entities/unsafe-condition.entity';
import { ReviewRating } from './entities/review-rating.entity';


@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(ShelterReport)
    private shelterReportRepository: Repository<ShelterReport>,
    @InjectRepository(UnsafeCondition)
    private unsafeConditionRepository: Repository<UnsafeCondition>,
    @InjectRepository(ReviewRating)
    private reviewRatingRepository: Repository<ReviewRating>,
  ) {}

  async createShelterReport(createShelterReportDto: CreateShelterReportDto): Promise<ShelterReport> {
    const shelterReport = this.shelterReportRepository.create(createShelterReportDto);
    return this.shelterReportRepository.save(shelterReport);
  }

  async createUnsafeCondition(createUnsafeConditionDto: CreateUnsafeConditionDto): Promise<UnsafeCondition> {
    const unsafeCondition = this.unsafeConditionRepository.create(createUnsafeConditionDto);
    return this.unsafeConditionRepository.save(unsafeCondition);
  }

  async createReviewRating(createReviewRatingDto: CreateReviewRatingDto): Promise<ReviewRating> {
    const reviewRating = this.reviewRatingRepository.create(createReviewRatingDto);
    return this.reviewRatingRepository.save(reviewRating);
  }

  async getAllShelterReports(): Promise<ShelterReport[]> {
    return this.shelterReportRepository.find();
  }

  async getAllUnsafeConditions(): Promise<UnsafeCondition[]> {
    return this.unsafeConditionRepository.find();
  }

  async getAllReviewRatings(): Promise<ReviewRating[]> {
    return this.reviewRatingRepository.find();
  }
}