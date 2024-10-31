import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shelter } from './shelter.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class ShelterService {
  constructor(
    @InjectRepository(Shelter)
    private shelterRepository: Repository<Shelter>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  

  async findAll(): Promise<Shelter[]> {
    const cacheKey = 'shelters';
    let shelters = await this.cacheManager.get<Shelter[]>(cacheKey);
    if (!shelters) {
      shelters = await this.shelterRepository.find();
      await this.cacheManager.set(cacheKey, shelters, 300);
    }
    return shelters;
  }

  async findOne(id: number): Promise<Shelter> {
    const cacheKey = `shelter_${id}`;
    let shelter = await this.cacheManager.get<Shelter>(cacheKey);
    if (!shelter) {
      shelter = await this.shelterRepository.findOne({ where: { id } });
      await this.cacheManager.set(cacheKey, shelter, 300);
    }
    return shelter;
  }

  async updateShelter(id: number, updateData: Partial<Shelter>): Promise<Shelter> {
    await this.shelterRepository.update(id, updateData);
    const updatedShelter = await this.shelterRepository.findOne({ where: { id } });
    await this.cacheManager.set(`shelter_${id}`, updatedShelter, 300);
    await this.cacheManager.del('shelters'); // Invalidate the cache for the list
    return updatedShelter;
  }

  async createShelter(shelterData: Partial<Shelter>): Promise<Shelter> {
      // Check if shelter already exists
      const existingShelter = await this.shelterRepository.findOne({
          where: { name: shelterData.name, address: shelterData.address }
      });
  
      if (existingShelter) {
          throw new Error('Shelter already exists');
      }
  
      // Create and save new shelter
      const shelter = this.shelterRepository.create(shelterData);
      const newShelter = await this.shelterRepository.save(shelter);
  
      // Cache management
      await this.cacheManager.set(`shelter_${newShelter.id}`, newShelter, 300);
      await this.cacheManager.del('shelters'); // Invalidate the cache for the list
  
      return newShelter;
  }
}