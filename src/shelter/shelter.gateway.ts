// shelter.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ShelterService } from './shelter.service';
import { Shelter } from './shelter.entity';

@WebSocketGateway({ namespace: '/shelters' })
export class ShelterGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly shelterService: ShelterService) {}

  @SubscribeMessage('updateShelter')
  async handleUpdateShelter(@MessageBody() data: { id: number; updateData: Partial<Shelter> }) {
    const updatedShelter = await this.shelterService.updateShelter(data.id, data.updateData);
    this.server.emit('shelterUpdated', updatedShelter);
  }
}