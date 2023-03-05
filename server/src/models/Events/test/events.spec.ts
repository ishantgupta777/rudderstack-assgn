import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { EventEntity } from '../../Events/entities/Event.entity';
import { EventsDatabaseService } from '../../Events/events.database.service';
import { EventsService } from '../../Events/events.service';
import { TrackingPlan } from '../../TrackingPlans/entities/TrackingPlan.entity';
import { EventsController } from '../events.controller';
import { eventsData } from './testData';
dotenv.config({ path: '.env.development' });

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

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
      providers: [EventsService, EventsDatabaseService],
    }).compile();

    controller = moduleRef.get<EventsController>(EventsController);
    service = moduleRef.get<EventsService>(EventsService);
  });

  afterEach(async () => {
    await service.truncate();
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

  // describe('findAll', () => {
  //   it('should return an array of events', async () => {
  //     await controller.createEvent(eventsData);
  //     await controller.createEvent(eventsData2);
  //     await controller.createEvent(eventsData3);

  //     const result = await controller.getAllEvents();
  //     expect(result).toBeInstanceOf(Array);
  //     expect(result.length).toBe(3);
  //     console.log(result);
  //     // expect(result[0]).toHaveProperty('events');
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return a tracking plan by id', async () => {
  //     const {
  //       data: { id },
  //     } = await controller.create(trackingPlanWithEventsData);

  //     const result = await controller.findOne(`${id}`);
  //     expect(result).toHaveProperty('data');
  //     const resultData = result.data;
  //     expect(resultData?.display_name).toBe(
  //       trackingPlanWithEventsData.display_name,
  //     );
  //     expect(resultData?.description).toBe(
  //       trackingPlanWithEventsData.description,
  //     );
  //     expect(resultData.events.length).toBe(2);
  //     expect(resultData.events[0].name).toBe(
  //       trackingPlanWithEventsData.rules.events[0].name,
  //     );
  //   });
  // });

  // describe('update', () => {
  //   it('should update a tracking plan by id', async () => {
  //     const {
  //       data: { id },
  //     } = await controller.create(trackingPlanWithEventsData);

  //     const updateDto: UpdateTrackingPlanDto = {
  //       display_name: 'Updated Tracking Plan',
  //       description: 'An updated tracking plan',
  //     };

  //     const result = await controller.update(`${id}`, updateDto);
  //     const resultData = result?.data || {};
  //     console.log(resultData);
  //     expect(resultData?.affected).toBe(1);
  //   });
  // });
});
