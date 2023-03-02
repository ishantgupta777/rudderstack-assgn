import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async getAllEvents() {
    return await this.eventsService.getAllEvents();
  }

  @Get(':eventId')
  async getEventById(@Param('eventId') eventId: number) {
    return await this.eventsService.findOne(eventId);
  }

  @Post()
  async createEvent(@Body() body: CreateEventDto) {
    return await this.eventsService.create(body);
  }

  @Put(':eventId')
  async updateEvent(
    @Param('eventId') eventId: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(eventId, updateEventDto);
  }

  @Delete(':eventId')
  async deleteEvent(@Param('eventId') eventId: number) {
    return this.eventsService.remove(eventId);
  }
}
