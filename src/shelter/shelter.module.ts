// shelter.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShelterService } from './shelter.service';
import { ShelterController } from './shelter.controller';
import { Shelter } from './shelter.entity';
import { ShelterGateway } from './shelter.gateway';
import { CacheModule, CacheStoreFactory } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [TypeOrmModule.forFeature([Shelter]),  CacheModule.register<RedisClientOptions>({
    store: redisStore as unknown as CacheStoreFactory,
    url: 'redis://localhost:6379',
  }),],
  providers: [ShelterService, ShelterGateway],
  controllers: [ShelterController],
})
export class ShelterModule {}