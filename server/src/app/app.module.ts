import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from 'src/models/Events/events.module';
import { getTypeORMConfigs } from './../config/typeormConfig';
import { TrackingPlanModule } from './../models/TrackingPlans/tracking-plan.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // nest js modules
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeORM module
    TypeOrmModule.forRoot(getTypeORMConfigs()),

    // custom build modules
    TrackingPlanModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
