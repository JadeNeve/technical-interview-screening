import { Dog } from './schema';

export const updateDog = async (dogId: string, updates: Partial<{ name: string; breed: string; color: string; weight: number }>) => {
  const doc = await Dog.findByIdAndUpdate(dogId, updates, { new: true });
  if (!doc) return null;
  return { id: doc.id, name: doc.name, breed: doc.breed, color: doc.color, weight: doc.weight };
};
