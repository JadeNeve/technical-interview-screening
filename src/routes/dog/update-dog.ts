import Boom from '@hapi/boom';
import { Lifecycle } from '@hapi/hapi';
import { z } from 'zod';
import { updateDog } from '@/dog';

const payloadSchema = z.object({
  name: z.string().optional(),
  breed: z.string().optional(),
  color: z.string().optional(),
  weight: z.number().optional(),
});

export const updateDogHandler: Lifecycle.Method = async (request) => {
  const { dogId } = request.params;
  let payload;

  try {
    payload = payloadSchema.parse(request.payload);
  } catch (e: any) {
    throw Boom.badRequest('Validation error', e.issues);
  }

  try {
    const updatedDog = await updateDog(dogId, payload);
    if (!updatedDog) {
      throw Boom.notFound('Dog not found');
    }
    return updatedDog;
  } catch (e) {
    throw Boom.internal();
  }
};
