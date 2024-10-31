import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('WEATHER_API_KEY');
    this.apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m';
  }

  async getCurrentWeather(lat: number, lon: number): Promise<any> {
    const response = await this.httpService.get(`${this.apiUrl}/weather`, {
      params: {
        lat,
        lon,
        appid: this.apiKey,
        units: 'metric',
      },
    }).toPromise();
    return response.data;
  }

  async getWeatherAlerts(lat: number, lon: number): Promise<any> {
    const response = await this.httpService.get(`${this.apiUrl}/alerts`, {
      params: {
        lat,
        lon,
        appid: this.apiKey,
      },
    }).toPromise();
    return response.data;
  }
}