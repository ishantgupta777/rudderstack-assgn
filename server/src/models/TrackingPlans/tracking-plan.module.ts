import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from '../Events/events.module';
import { TrackingPlan } from './entities/TrackingPlan.entity';
import { TrackingPlanController } from './tracking-plan.controller';
import { TrackingPlanDatabaseService } from './tracking-plan.database.service';
import { TrackingPlanService } from './tracking-plan.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrackingPlan]), EventModule],
  controllers: [TrackingPlanController],
  providers: [TrackingPlanService, TrackingPlanDatabaseService],
  exports: [],
})
export class TrackingPlanModule {}
