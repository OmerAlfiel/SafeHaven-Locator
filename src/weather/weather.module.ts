import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WeatherService } from './weather.service';

@Module({
  imports: [HttpModule],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}