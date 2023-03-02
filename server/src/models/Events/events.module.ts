import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/Event.entity';
import { EventsController } from './events.controller';
import { EventsDatabaseService } from './events.database.service';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [EventsController],
  providers: [EventsService, EventsDatabaseService],
  exports: [EventsService, EventsDatabaseService],
})
export class EventModule {}
