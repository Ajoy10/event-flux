import { z } from 'zod';

const location_schema = z.object({
  type: z.enum(['physical', 'virtual', 'hybrid']),
  physical: z
    .object({
      address_line_1: z.string(),
      address_line_2: z.string().optional(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      pincode: z.string(),
    })
    .nullable(),
  virtual: z
    .object({
      virtual_location: z.string(),
    })
    .nullable(),
});

export const Z_NewEventData = z.object({
  title: z.string().min(2).max(256),
  description: z.string().min(2).max(2048),
  date: z.string().date(),
  time: z.string().time(),
  location: location_schema,
  banner_image: z.string(),
});
