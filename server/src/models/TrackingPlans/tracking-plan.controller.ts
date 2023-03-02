import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTrackingPlanDto } from './dto/create-tracking-plan.dto';
import { UpdateTrackingPlanDto } from './dto/update-tracking-plan.dto';
import { TrackingPlanService } from './tracking-plan.service';

@Controller('tracking-plans')
export class TrackingPlanController {
  constructor(private readonly trackingPlanService: TrackingPlanService) {}

  @Get()
  async findAll() {
    const trackingPlans = await this.trackingPlanService.findAll();
    return {
      status: HttpStatus.OK,
      message: 'Tracking plans retrieved successfully',
      data: trackingPlans,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const trackingPlan = await this.trackingPlanService.findOne(id);
    if (!trackingPlan) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Tracking plan not found',
      };
    }
    return {
      status: HttpStatus.OK,
      message: 'Tracking plan retrieved successfully',
      data: trackingPlan,
    };
  }

  @Post('/')
  async create(
    @Body('tracking_plan') createTrackingPlanDto: CreateTrackingPlanDto,
  ) {
    const trackingPlan = await this.trackingPlanService.create(
      createTrackingPlanDto,
    );
    return {
      status: HttpStatus.CREATED,
      message: 'Tracking plan created successfully',
      data: trackingPlan,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTrackingPlanDto: UpdateTrackingPlanDto,
  ) {
    const trackingPlan = await this.trackingPlanService.update(
      id,
      updateTrackingPlanDto,
    );
    return {
      status: HttpStatus.OK,
      message: 'Tracking plan updated successfully',
      data: trackingPlan,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedTrackingPlan = await this.trackingPlanService.delete(+id);
    if (!deletedTrackingPlan) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Tracking plan not found',
      };
    }
    return {
      status: HttpStatus.OK,
      message: 'Tracking plan deleted successfully',
      data: deletedTrackingPlan,
    };
  }
}
