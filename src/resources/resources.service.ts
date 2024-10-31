import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto/create-resource.dto';


@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async createResource(createResourceDto: CreateResourceDto): Promise<Resource> {
    const resource = this.resourceRepository.create(createResourceDto);
    return this.resourceRepository.save(resource);
  }

  async getAllResources(): Promise<Resource[]> {
    return this.resourceRepository.find();
  }

  async getResourcesByShelter(shelter_id: number): Promise<Resource[]> {
    return this.resourceRepository.find({ where: { shelter_id } });
  }
}