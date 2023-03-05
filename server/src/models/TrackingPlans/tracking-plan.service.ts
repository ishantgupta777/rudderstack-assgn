import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { EventsDatabaseService } from '../Events/events.database.service';

import { EventEntity } from '../Events/entities/Event.entity';
import { CreateTrackingPlanDto } from './dto/create-tracking-plan.dto';
import { UpdateTrackingPlanDto } from './dto/update-tracking-plan.dto';
import { TrackingPlan } from './entities/TrackingPlan.entity';
import { TrackingPlanDatabaseService } from './tracking-plan.database.service';

@Injectable()
export class TrackingPlanService {
  constructor(
    private readonly trackingPlanDatabaseService: TrackingPlanDatabaseService,
    private readonly eventDatabaseService: EventsDatabaseService,
  ) {}

  async create(
    createTrackingPlanDto: CreateTrackingPlanDto,
  ): Promise<TrackingPlan> {
    const events = [];
    await Promise.all(
      createTrackingPlanDto.rules.events.map(async (eventData) => {
        const event = new EventEntity();
        event.description = eventData.description;
        event.name = eventData.name;
        event.rules = eventData.rules;
        events.push(await this.eventDatabaseService.create(event));
      }),
    );

    const trackingPlan = new TrackingPlan();
    trackingPlan.display_name = createTrackingPlanDto.display_name;
    trackingPlan.description = createTrackingPlanDto.description;
    trackingPlan.events = events;
    return await this.trackingPlanDatabaseService.create(trackingPlan);
  }

  async findAll(): Promise<TrackingPlan[]> {
    return await this.trackingPlanDatabaseService.findAll();
  }

  async findOne(id: string): Promise<TrackingPlan> {
    return await this.trackingPlanDatabaseService.findOne(id);
  }

  async update(
    id: string,
    updateTrackingPlanDto: UpdateTrackingPlanDto,
  ): Promise<any> {
    return await this.trackingPlanDatabaseService.update(
      id,
      updateTrackingPlanDto,
    );
  }

  async delete(id: number): Promise<any> {
    return await this.trackingPlanDatabaseService.delete(id);
  }

  async truncate(): Promise<DeleteResult> {
    return await this.trackingPlanDatabaseService.truncate();
  }
}
