import Boom from '@hapi/boom';
import { Lifecycle } from '@hapi/hapi';
import { z } from 'zod';
import { createDog } from '@/dog';

const payloadSchema = z.object({
  name: z.string(),
  breed: z.string(),
  color: z.string(),
  weight: z.number(),
});

export const createDogHandler: Lifecycle.Method = async (request) => {
  let payload;
  try {
    payload = payloadSchema.parse(request.payload);
  } catch (e: any) {
    throw Boom.badRequest('Validation error', e.issues);
  }
  
  try {
    return await createDog(payload.name, payload.breed, payload.color, payload.weight);
  } catch (e) {
    throw Boom.internal();
  }
};
