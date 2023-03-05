import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { EventEntity } from '../../Events/entities/Event.entity';
import { EventsDatabaseService } from '../../Events/events.database.service';
import { EventsService } from '../../Events/events.service';
import { UpdateTrackingPlanDto } from '../dto/update-tracking-plan.dto';
import { TrackingPlan } from '../entities/TrackingPlan.entity';
import { TrackingPlanController } from '../tracking-plan.controller';
import { TrackingPlanDatabaseService } from '../tracking-plan.database.service';
import { TrackingPlanService } from '../tracking-plan.service';
import {
  trackingPlanData,
  trackingPlanWithDuplicateEventsData,
  trackingPlanWithEventsData,
} from './testData';
dotenv.config({ path: '.env.development' });

describe('TrackingPlanController', () => {
  let controller: TrackingPlanController;
  let service: TrackingPlanService;
  let eventsService: EventsService;

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
      controllers: [TrackingPlanController],
      providers: [
        TrackingPlanService,
        EventsService,
        EventsDatabaseService,
        TrackingPlanDatabaseService,
      ],
    }).compile();

    controller = moduleRef.get<TrackingPlanController>(TrackingPlanController);
    service = moduleRef.get<TrackingPlanService>(TrackingPlanService);
    eventsService = moduleRef.get<EventsService>(EventsService);
  });

  afterEach(async () => {
    await service.truncate();
    await eventsService.truncate();
  });

  describe('create', () => {
    it('should create a new tracking plan', async () => {
      const result: any = await controller.create(trackingPlanData);
      const resultData = result?.data || {};
      expect(resultData).toHaveProperty('id');
      expect(resultData.display_name).toBe(trackingPlanData.display_name);
      expect(resultData.description).toBe(trackingPlanData.description);
    });

    // we don't have any constraint on tracking plan name, so we should be able to create to  tracking plan with the same name
    it('should create a new tracking plan with the same name', async () => {
      const result: any = await controller.create(trackingPlanData);
      const resultData = result?.data || {};
      expect(resultData).toHaveProperty('id');
      expect(resultData.display_name).toBe(trackingPlanData.display_name);
      expect(resultData.description).toBe(trackingPlanData.description);
    });

    it('should create a new tracking plan with the events with it', async () => {
      const result: any = await controller.create(trackingPlanWithEventsData);
      const resultData = result?.data || {};
      expect(resultData).toHaveProperty('id');
      expect(resultData?.display_name).toBe(
        trackingPlanWithEventsData.display_name,
      );
      expect(resultData?.description).toBe(
        trackingPlanWithEventsData.description,
      );
      expect(resultData?.events?.length).toBe(2);
      expect(resultData?.events[0].name).toBe(
        trackingPlanWithEventsData.rules.events[0].name,
      );
    });
  });

  describe('constraints', () => {
    it('should not create a new tracking plan with the duplicate events data', async () => {
      try {
        expect(
          await controller.create(trackingPlanWithDuplicateEventsData),
        ).toThrowError();
      } catch (err) {
        expect(err.message).toContain(
          'duplicate key value violates unique constraint',
        );
      }
    });
  });

  describe('findAll', () => {
    it('should return an array of tracking plans', async () => {
      await controller.create(trackingPlanData);
      await controller.create(trackingPlanWithEventsData);
      await controller.create(trackingPlanData);

      const result = await controller.findAll();
      const resultData = result?.data || [];
      expect(resultData).toBeInstanceOf(Array);
      expect(resultData.length).toBe(3);
      expect(resultData[0]).toHaveProperty('events');
    });
  });

  describe('findOne', () => {
    it('should return a tracking plan by id', async () => {
      const {
        data: { id },
      } = await controller.create(trackingPlanWithEventsData);

      const result = await controller.findOne(`${id}`);
      expect(result).toHaveProperty('data');
      const resultData = result.data;
      expect(resultData?.display_name).toBe(
        trackingPlanWithEventsData.display_name,
      );
      expect(resultData?.description).toBe(
        trackingPlanWithEventsData.description,
      );
      expect(resultData.events.length).toBe(2);
      expect(resultData.events[0].name).toBe(
        trackingPlanWithEventsData.rules.events[0].name,
      );
    });
  });

  describe('update', () => {
    it('should update a tracking plan by id', async () => {
      const {
        data: { id },
      } = await controller.create(trackingPlanWithEventsData);

      const updateDto: UpdateTrackingPlanDto = {
        display_name: 'Updated Tracking Plan',
        description: 'An updated tracking plan',
      };

      const result = await controller.update(`${id}`, updateDto);
      const resultData = result?.data || {};
      console.log(resultData);
      expect(resultData?.affected).toBe(1);
    });
  });
});
