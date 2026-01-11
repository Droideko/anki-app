import { Category, NormalizedCategory } from '@shared/types/category';
import { Deck } from '@shared/types/deck';

const denormalizeCategory = (
  categoryId: number,
  categoriesById: Record<number, NormalizedCategory>,
  decksById: Record<number, Deck>,
): Category => {
  const category = categoriesById[categoryId];
  if (!category) {
    throw new Error(`Category with id ${categoryId} not found.`);
  }

  // Рекурсивно получаем подкатегории
  const subcategories = category.childIds.map((childId) =>
    denormalizeCategory(childId, categoriesById, decksById),
  );

  // Получаем колоды
  const decks = category.deckIds.map((deckId) => decksById[deckId]);

  // Извлекаем lastFetched только для верхней категории
  const { lastFetched, ...categoryData } = category;

  // Формируем денормализованную категорию
  const denormalizedCategory: Category = {
    ...categoryData,
    subcategories,
    decks,
    // Добавляем lastFetched только если оно существует
    ...(lastFetched ? { lastFetched } : {}),
  };

  return denormalizedCategory;
};

export default denormalizeCategory;
