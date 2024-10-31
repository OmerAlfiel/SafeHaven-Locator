import { Controller, Get, Param, Put, Body, Post, Res, HttpException, HttpStatus } from '@nestjs/common';
import { ShelterService } from './shelter.service';
import { Shelter } from './shelter.entity';
import { Response } from 'express';
import { createObjectCsvStringifier } from 'csv-writer';
import { CreateShelterDto } from './shelter.dto';


@Controller('shelter')
export class ShelterController {
  constructor(private readonly shelterService: ShelterService) {}

  @Get()
  async findAll(): Promise<Shelter[]> {
    try {
      return await this.shelterService.findAll();
    } catch (error) {
      console.error('Error fetching shelters:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async createShelter(@Body() shelterData: CreateShelterDto): Promise<Shelter> { // Use the DTO
    try {
      return await this.shelterService.createShelter(shelterData);
    } catch (error) {
      console.error('Error creating shelter:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Shelter> {
    try {
      return await this.shelterService.findOne(+id);
    } catch (error) {
      console.error('Error fetching shelter:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put(':id')
  async updateShelter(@Param('id') id: string, @Body() updateData: Partial<Shelter>): Promise<Shelter> {
    try {
      return await this.shelterService.updateShelter(+id, updateData);
    } catch (error) {
      console.error('Error updating shelter:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('download/:format')
  async downloadShelters(@Param('format') format: string, @Res() res: Response): Promise<void> {
    try {
      const shelters = await this.shelterService.findAll();

      if (format === 'csv') {
        const csvStringifier = createObjectCsvStringifier({
          header: [
            { id: 'id', title: 'ID' },
            { id: 'name', title: 'Name' },
            { id: 'location', title: 'Location' },
            // Add other fields as necessary
          ],
        });

        const csvData = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(shelters);
        res.header('Content-Type', 'text/csv');
        res.attachment('shelters.csv');
        res.send(csvData);
      } else if (format === 'json') {
        res.header('Content-Type', 'application/json');
        res.attachment('shelters.json');
        res.send(shelters);
      } else {
        res.status(400).send('Invalid format');
      }
    } catch (error) {
      console.error('Error downloading shelters:', error);
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}