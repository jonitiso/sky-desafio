import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { HttpModule } from '@nestjs/axios';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  controllers: [TestController],
  providers: [TestService],
  imports: [
    HttpModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: 'amqp://localhost:5672',
      connectionInitOptions: { wait: false },
    }),
  ],
})
export class TestModule {}
