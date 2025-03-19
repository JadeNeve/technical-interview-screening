import { Dog } from './schema';

export const createDog = async (name: string, breed: string, color: string, weight: number) => {
  const doc = new Dog({ name, breed, color, weight });
  await doc.save();
  return { id: doc.id, name, breed, color, weight };
};
