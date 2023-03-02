import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveEventFromTrackingPlanDto {
  @IsString()
  @IsNotEmpty()
  eventId: string;
}
