import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from 'src/models/Events/entities/Event.entity';
import { TrackingPlan } from 'src/models/TrackingPlans/entities/TrackingPlan.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UpdateTrackingPlanDto } from './dto/update-tracking-plan.dto';

@Injectable()
export class TrackingPlanDatabaseService {
  constructor(
    @InjectRepository(TrackingPlan)
    private trackingPlanRepository: Repository<TrackingPlan>,
  ) {}

  async create(trackingPlan: TrackingPlan): Promise<TrackingPlan> {
    return this.trackingPlanRepository.save(trackingPlan);
  }

  async findAll(): Promise<TrackingPlan[]> {
    return this.trackingPlanRepository.find({ relations: { events: true } });
  }

  async findOne(id: string): Promise<TrackingPlan> {
    return this.trackingPlanRepository.findOne({
      where: { id: +id },
      relations: { events: true },
    });
  }

  async update(id: string, trackingPlan: UpdateTrackingPlanDto): Promise<any> {
    return await this.trackingPlanRepository.update(id, trackingPlan);
  }

  async delete(id: number): Promise<any> {
    return await this.trackingPlanRepository.delete(id);
  }

  async getTrackingPlanEvents(trackingPlanId: number): Promise<EventEntity[]> {
    const trackingPlan = await this.trackingPlanRepository.findOneOrFail({
      where: {
        id: trackingPlanId,
      },
      relations: { events: true },
    });
    return trackingPlan.events;
  }

  async addEventToTrackingPlan(
    trackingPlanId: string,
    event: EventEntity,
  ): Promise<void> {
    const trackingPlan = await this.trackingPlanRepository.findOne({
      where: {
        id: +trackingPlanId,
      },
      relations: { events: true },
    });
    trackingPlan.events.push(event);
    await this.trackingPlanRepository.save(trackingPlan);
  }

  async removeEventFromTrackingPlan(
    trackingPlanId: string,
    eventId: string,
  ): Promise<void> {
    const trackingPlan = await this.trackingPlanRepository.findOne({
      where: { id: +trackingPlanId },
      relations: { events: true },
    });

    trackingPlan.events = trackingPlan.events.filter(
      (event) => event.id !== +eventId,
    );
    await this.trackingPlanRepository.save(trackingPlan);
  }

  async truncate(): Promise<DeleteResult> {
    return await this.trackingPlanRepository.delete({});
  }
}
