import { Module } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Resource } from './resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  providers: [ResourcesService],
  controllers: [ResourcesController]
})
export class ResourcesModule {}
