import { CreateTrackingPlanDto } from '../dto/create-tracking-plan.dto';

export const trackingPlanData: CreateTrackingPlanDto = {
  display_name: 'Test Tracking Plan',
  description: 'A test tracking plan',
  rules: { events: [] },
};

export const trackingPlanWithEventsData: CreateTrackingPlanDto = {
  display_name: 'Test Tracking Plan With Events',
  description: 'A test tracking plan which should create events with it',
  rules: {
    events: [
      JSON.parse(
        JSON.stringify({
          name: 'Event 1111',
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
        }),
      ),
      JSON.parse(
        JSON.stringify({
          name: 'Event 221111',
          description: 'Event 2 description',
          rules: JSON.parse(
            JSON.stringify({
              key: 'value',
              key2: 'value2',
              nestedKey: {
                nestedKey1: 'nestedValue',
              },
            }),
          ),
        }),
      ),
    ],
  },
};

export const trackingPlanWithDuplicateEventsData: CreateTrackingPlanDto = {
  display_name: 'Test Tracking Plan With Events',
  description: 'A test tracking plan which should create events with it',
  rules: {
    events: [
      {
        name: 'Event 11',
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
      },
      {
        name: 'Event 11',
        description: 'Event 2 description',
        rules: JSON.parse(
          JSON.stringify({
            key: 'value',
            key2: 'value2',
            nestedKey: {
              nestedKey1: 'nestedValue',
            },
          }),
        ),
      },
    ],
  },
};
