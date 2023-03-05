import { CreateEventDto } from '../dto/create-event.dto';

export const eventsData: CreateEventDto = {
  name: 'Event 1',
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
  name: 'Event 2',
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
  name: 'Event 3',
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
