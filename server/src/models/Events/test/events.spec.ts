import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { EventEntity } from '../../Events/entities/Event.entity';
import { EventsDatabaseService } from '../../Events/events.database.service';
import { EventsService } from '../../Events/events.service';
import { TrackingPlan } from '../../TrackingPlans/entities/TrackingPlan.entity';
import { EventsController } from '../events.controller';
import { TrackingPlanDatabaseService } from './../../TrackingPlans/tracking-plan.database.service';
import { TrackingPlanService } from './../../TrackingPlans/tracking-plan.service';
import { eventsData, eventsData2, eventsData3 } from './testData';
dotenv.config({ path: '.env.development' });

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;
  let trackingPlanService: TrackingPlanService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: '127.0.0.1',
          port: parseInt(process.env.PSQL_PORT),
          username: process.env.PSQL_USERNAME,
          password: process.env.PSQL_PASSWORD,
          database: 'testing-db',
          autoLoadEntities: true,
          synchronize: true,
          entities: [TrackingPlan, EventEntity],
        }),
        TypeOrmModule.forFeature([TrackingPlan, EventEntity]),
      ],
      controllers: [EventsController],
      providers: [
        EventsService,
        EventsDatabaseService,
        TrackingPlanService,
        TrackingPlanDatabaseService,
      ],
    }).compile();

    controller = moduleRef.get<EventsController>(EventsController);
    service = moduleRef.get<EventsService>(EventsService);
    trackingPlanService =
      moduleRef.get<TrackingPlanService>(TrackingPlanService);

    await service.truncate();
    await trackingPlanService.truncate();
  });

  afterEach(async () => {
    await service.truncate();
    await trackingPlanService.truncate();
  });

  describe('create', () => {
    it('should create a new event', async () => {
      const result: any = await controller.createEvent(eventsData);
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(eventsData.name);
      expect(result.description).toBe(eventsData.description);
      expect(result.rules).toStrictEqual(
        JSON.parse(JSON.stringify(eventsData.rules)),
      );
    });
  });

  describe('constraints', () => {
    it('should not create events with duplicate data', async () => {
      await controller.createEvent(eventsData);
      try {
        expect(await controller.createEvent(eventsData)).toThrowError();
      } catch (err) {
        expect(err.message).toContain(
          'duplicate key value violates unique constraint',
        );
      }
    });
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      await controller.createEvent(eventsData);
      await controller.createEvent(eventsData2);
      await controller.createEvent(eventsData3);

      const result = await controller.getAllEvents();
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toHaveProperty('name');
    });
  });

  describe('findOne', () => {
    it('should return a tracking plan by id', async () => {
      const { id } = await controller.createEvent(eventsData);

      const result = await controller.getEventById(id);
      expect(result?.name).toBe(eventsData.name);
      expect(result?.description).toBe(eventsData.description);
    });
  });

  describe('update', () => {
    it('should update an event by id', async () => {
      const { id } = await controller.createEvent(eventsData);

      const result = await controller.updateEvent(id, eventsData2);
      expect(result?.affected).toBe(1);

      const event = await controller.getEventById(id);
      expect(event?.name).toBe(eventsData2.name);
      expect(event?.description).toBe(eventsData2.description);
    });
  });
});
