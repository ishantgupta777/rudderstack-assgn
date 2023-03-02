import { Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from './entities/Event.entity';
import { EventsDatabaseService } from './events.database.service';

@Injectable()
export class EventsService {
  constructor(private readonly eventsDatabaseService: EventsDatabaseService) {}

  async create(body: CreateEventDto): Promise<EventEntity> {
    const event = new EventEntity();
    event.name = body.name;
    event.description = body.description;
    event.rules = body.rules;
    return await this.eventsDatabaseService.create(event);
  }

  async getAllEvents(): Promise<EventEntity[]> {
    return await this.eventsDatabaseService.findAll();
  }

  async findOne(id: number): Promise<EventEntity> {
    return await this.eventsDatabaseService.findOne(id);
  }

  async update(
    id: number,
    updateEventDto: UpdateEventDto,
  ): Promise<UpdateResult> {
    return this.eventsDatabaseService.update(id, updateEventDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.eventsDatabaseService.delete(id);
  }
}
