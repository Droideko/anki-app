import { NormalizedCategoryOrDeck } from '@shared/types/category';

const sortByUpdatedAtDesc = (
  a: NormalizedCategoryOrDeck,
  b: NormalizedCategoryOrDeck,
): number => {
  const dateA = new Date(a.updatedAt).getTime();
  const dateB = new Date(b.updatedAt).getTime();
  return dateB - dateA;
};

export default sortByUpdatedAtDesc;
