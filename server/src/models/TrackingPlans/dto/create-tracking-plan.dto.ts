import { IsObject, IsString } from 'class-validator';
import { CreateEventDto } from 'src/models/Events/dto/create-event.dto';

type rules = {
  events: CreateEventDto[];
};

export class CreateTrackingPlanDto {
  @IsString()
  display_name: string;

  @IsString()
  description: string;

  @IsObject({})
  rules: rules;
}
