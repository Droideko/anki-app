import { SQLiteDatabase } from "expo-sqlite";
import getDecksByCategoryIdFromSQLite from "../../decks/services/getDecksByCategoryIdFromSQLite";
import { Categories, Category } from "../types";

const getCategoriesFromSQLite = async (
  db: SQLiteDatabase
): Promise<Categories> => {
  // Получаем все категории
  const categoriesData = await db.getAllAsync<Category>(
    "SELECT * FROM Category"
  );

  // Создаем карту категорий по ID
  const categoriesById: Record<number, Category> = {};
  const rootCategories: Category[] = [];

  for (const category of categoriesData) {
    categoriesById[category.id] = {
      ...category,
      subcategories: [],
      decks: [],
    };
  }

  // Строим иерархию и загружаем колоды
  for (const category of categoriesData) {
    const currentCategory = categoriesById[category.id];
    // Загружаем колоды для текущей категории
    currentCategory.decks = await getDecksByCategoryIdFromSQLite(
      db,
      category.id
    );

    if (category.parentId) {
      const parentCategory = categoriesById[category.parentId];
      if (parentCategory?.subcategories) {
        parentCategory.subcategories.push(currentCategory);
      }
    } else {
      rootCategories.push(currentCategory);
    }
  }

  return rootCategories;
};

export default getCategoriesFromSQLite;

// const getCategoriesFromSQLite = async (
//   // TODO Нужно проверить правильно ли (СКОРЕЕ ВСЕГО НЕТ)
//   db: SQLiteDatabase
// ): Promise<Categories> => {
//   // Получаем все категории
//   const categoriesData = await db.getAllAsync<Category>(
//     "SELECT * FROM Category"
//   );

//   // Строим иерархию категорий
//   const categoriesById: Record<number, Category> = {};
//   const rootCategories: Category[] = [];

//   // Создаем карту категорий по ID
//   for (const category of categoriesData) {
//     categoriesById[category.id] = { ...category, subcategories: [] };
//   }

//   // Строим иерархию
//   for (const category of categoriesData) {
//     if (category.parentId) {
//       const parentCategory = categoriesById[category.parentId];
//       if (parentCategory?.subcategories) {
//         parentCategory.subcategories.push(categoriesById[category.id]);
//       }
//     } else {
//       rootCategories.push(categoriesById[category.id]);
//     }
//   }

//   return rootCategories;
// };

// export default getCategoriesFromSQLite;
