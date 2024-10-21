import { SQLiteDatabase } from "expo-sqlite";
import getDecksByCategoryIdFromSQLite from "../../decks/services/getDecksByCategoryIdFromSQLite";
import { Category } from "../types";

const getSubcategoriesFromSQLite = async (
  db: SQLiteDatabase,
  parentId: number
): Promise<Category[]> => {
  const subcategoriesData = await db.getAllAsync<Category>(
    "SELECT * FROM Category WHERE parentId = ?;",
    parentId
  );

  const subcategories: Category[] = [];

  for (const subcategory of subcategoriesData) {
    // Рекурсивно получаем подкатегории
    subcategory.subcategories = await getSubcategoriesFromSQLite(
      db,
      subcategory.id
    );
    // Получаем связанные колоды
    subcategory.decks = await getDecksByCategoryIdFromSQLite(
      db,
      subcategory.id
    );
    subcategories.push(subcategory);
  }

  return subcategories;
};

const getCategoryFromSQLite = async (
  db: SQLiteDatabase,
  id: number
): Promise<Category> => {
  // Получаем категорию
  const category = await db.getFirstAsync<Category>(
    "SELECT * FROM Category WHERE id = ?;",
    id
  );

  if (!category) {
    throw new Error("Категория не найдена в SQLite");
  }

  // Получаем подкатегории
  category.subcategories = await getSubcategoriesFromSQLite(db, category.id);
  // Получаем связанные колоды
  category.decks = await getDecksByCategoryIdFromSQLite(db, category.id);

  return category;
};

export default getCategoryFromSQLite;

// const getSubcategoriesFromSQLite = async (
//   db: SQLiteDatabase,
//   parentId: number
// ): Promise<Category[]> => {
//   const subcategoriesData = await db.getAllAsync<Category>(
//     "SELECT * FROM Category WHERE parentId = ?;",
//     parentId
//   );

//   const subcategories: Category[] = [];

//   for (const subcategory of subcategoriesData) {
//     subcategory.subcategories = await getSubcategoriesFromSQLite(
//       db,
//       subcategory.id
//     );
//     subcategories.push(subcategory);
//   }

//   return subcategories;
// };

// const getCategoryFromSQLite = async (
//   db: SQLiteDatabase,
//   id: number
// ): Promise<Category> => {
//   // Получаем категорию
//   const category = await db.getFirstAsync<Category>(
//     "SELECT * FROM Category WHERE id = ?;",
//     id
//   );

//   if (!category) {
//     throw new Error("Категория не найдена в SQLite");
//   }

//   // Получаем подкатегории
//   category.subcategories = await getSubcategoriesFromSQLite(db, category.id);

//   return category;
// };

// export default getCategoryFromSQLite;
