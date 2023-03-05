import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from './entities/Event.entity';

@Injectable()
export class EventsDatabaseService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventsRepository: Repository<EventEntity>,
  ) {}

  create(event: EventEntity): Promise<EventEntity> {
    return this.eventsRepository.save(event);
  }

  findOne(id: number): Promise<EventEntity> {
    return this.eventsRepository.findOne({ where: { id } });
  }

  async update(id: number, event: UpdateEventDto): Promise<UpdateResult> {
    console.log(id, event);
    return this.eventsRepository.update(id, event);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.eventsRepository.delete(id);
  }

  async findAll(): Promise<EventEntity[]> {
    return this.eventsRepository.find();
  }

  async count(queryParams: any): Promise<number> {
    return this.eventsRepository.count(queryParams);
  }

  async truncate(): Promise<DeleteResult> {
    return await this.eventsRepository.delete({});
  }
}
