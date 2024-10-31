import { Module } from '@nestjs/common';
import { CacheModule, CacheStoreFactory } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthModule } from './auth/auth.module';
import { ShelterModule } from './shelter/shelter.module';
import { FirebaseAdminService } from './notifications/firebase-admin.service';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import { ReportsModule } from './reports/reports.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available globally
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your-username',
      password: 'your-password',
      database: 'your-database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '60m' },
    }),
    ShelterModule,
    NotificationsModule,
    WeatherModule,
    ReportsModule,
    ResourcesModule,
  ],
  providers: [JwtStrategy, FirebaseAdminService],
})
export class AppModule {}