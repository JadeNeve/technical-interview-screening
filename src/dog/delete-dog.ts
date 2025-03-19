import { Dog } from './schema';

export const deleteDog = async (dogId: string) => {
  const doc = await Dog.findByIdAndDelete(dogId);
  if (!doc) return null;
  return { id: doc.id };
};
