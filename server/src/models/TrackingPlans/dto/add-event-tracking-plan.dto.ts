import { IsNotEmpty, IsString } from 'class-validator';

export class AddEventToTrackingPlanDto {
  @IsString()
  @IsNotEmpty()
  eventId: string;
}
