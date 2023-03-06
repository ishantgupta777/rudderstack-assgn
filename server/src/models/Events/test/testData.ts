import { CreateEventDto } from '../dto/create-event.dto';

export const eventsData: CreateEventDto = {
  name: 'Event 21',
  description: 'Event 1 description',
  rules: JSON.parse(
    JSON.stringify({
      key: 'value',
      key2: 'value2',
      nestedKey: {
        nestedKey1: 'nestedValue',
      },
    }),
  ),
};

export const eventsData2: CreateEventDto = {
  name: 'Event 22',
  description: 'Event 3 description',
  rules: JSON.parse(
    JSON.stringify({
      key: 'value',
      key2: 'value2',
      nestedKey: {
        nestedKey1: 'nestedValue',
      },
    }),
  ),
};

export const eventsData3: CreateEventDto = {
  name: 'Event 23',
  description: 'Event 3 description',
  rules: JSON.parse(
    JSON.stringify({
      key: 'value',
      key2: 'value2',
      nestedKey: {
        nestedKey1: 'nestedValue',
      },
    }),
  ),
};
