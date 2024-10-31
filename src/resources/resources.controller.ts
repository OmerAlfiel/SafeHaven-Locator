import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto/create-resource.dto';


@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  createResource(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.createResource(createResourceDto);
  }

  @Get()
  getAllResources() {
    return this.resourcesService.getAllResources();
  }

  @Get('shelter/:shelter_id')
  getResourcesByShelter(@Param('shelter_id') shelter_id: number) {
    return this.resourcesService.getResourcesByShelter(shelter_id);
  }
}