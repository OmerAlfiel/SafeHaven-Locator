import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications/notifications.service';

@Module({
  providers: [NotificationsService]
})
export class NotificationsModule {}
