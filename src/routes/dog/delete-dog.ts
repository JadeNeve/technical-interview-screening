import Boom from '@hapi/boom';
import { Lifecycle } from '@hapi/hapi';
import { deleteDog } from '@/dog';

export const deleteDogHandler: Lifecycle.Method = async (request) => {
  const { dogId } = request.params;

  try {
    const deleted = await deleteDog(dogId);
    if (!deleted) {
      throw Boom.notFound('Dog not found');
    }
    return { message: 'Dog deleted successfully' };
  } catch (e) {
    throw Boom.internal();
  }
};
