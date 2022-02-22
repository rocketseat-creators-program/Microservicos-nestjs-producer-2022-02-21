import { Controller, Get } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  ClientRMQ,
  Transport,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Client({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'storage-ec',
      queueOptions: {
        durable: false,
      },
    },
  })
  client: ClientRMQ;

  @Get()
  sendToStorage() {
    return this.client.send('storage-ec', {
      message: 'remove chicken from storage',
    });
  }
}
