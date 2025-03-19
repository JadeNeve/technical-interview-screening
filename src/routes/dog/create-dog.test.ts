import { Server } from '@hapi/hapi';
import { establishMongoConnection } from '@/util/mongo';
import { createDogHandler } from './create-dog';

const server = new Server();
beforeAll(async () => {
  await establishMongoConnection();

  server.route({
    method: 'POST',
    path: '/',
    options: {
      handler: createDogHandler,
    },
  });
  await server.start();
});

describe('createDogHandler', () => {
  it('Responds with an id', async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/',
      payload: {
        name: 'Buddy',
        breed: 'Labrador',
        color: 'Golden',
        weight: 30,
      },
    });

    const payload = JSON.parse(res.payload);
    expect(payload).toHaveProperty('id');
    expect(payload.name).toBe('Buddy');
    expect(payload.breed).toBe('Labrador');
    expect(payload.color).toBe('Golden');
    expect(payload.weight).toBe(30);
  });
});

afterAll(async () => {
  await server.stop();
});
