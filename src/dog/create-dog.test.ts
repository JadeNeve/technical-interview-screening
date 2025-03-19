import { establishMongoConnection } from '@/util/mongo';
import { createDog } from './create-dog';
import { Dog } from './schema';

beforeAll(async () => {
  await establishMongoConnection();
});

describe('createDog', () => {
  it('Inserts a new dog record', async () => {
    await createDog('Buddy', 'Labrador', 'Golden', 30);

    const doc = await Dog.findOne({ name: 'Buddy' });
    expect(doc).not.toBeNull();
    expect(doc?.breed).toBe('Labrador');
    expect(doc?.color).toBe('Golden');
    expect(doc?.weight).toBe(30);
  });
});

afterEach(async () => {
  await Dog.deleteMany({});
});
