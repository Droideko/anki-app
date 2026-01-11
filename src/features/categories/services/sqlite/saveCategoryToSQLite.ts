import { SQLiteDatabase } from 'expo-sqlite';

import saveDeckToSQLite from '@shared/db/deck/saveDeckToSQLite';
import { Category } from '@shared/types/category';

const saveCategoryToSQLite = async (db: SQLiteDatabase, category: Category) => {
  // Вставляем или обновляем категорию
  await db.runAsync(
    `INSERT OR REPLACE INTO Category (
      id, name, userId, parentId, accessLevel, type, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    category.id,
    category.name,
    category.userId,
    category.parentId,
    category.accessLevel,
    category.type,
    category.createdAt,
    category.updatedAt,
  );

  // Сохраняем связанные колоды
  if (category.decks && category.decks.length > 0) {
    for (const deck of category.decks) {
      // Устанавливаем правильный categoryId для колоды
      deck.categoryId = category.id;
      await saveDeckToSQLite(db, deck);
    }
  }

  // Рекурсивно сохраняем подкатегории
  if (category.subcategories && category.subcategories.length > 0) {
    for (const subcategory of category.subcategories) {
      await saveCategoryToSQLite(db, subcategory);
    }
  }
};

export default saveCategoryToSQLite;

// const saveCategoryToSQLite = async (db: SQLiteDatabase, category: Category) => {
//   // Вставляем или обновляем категорию
//   await db.runAsync(
//     `INSERT OR REPLACE INTO Category (
//       id, name, userId, parentId, accessLevel, createdAt, updatedAt
//     ) VALUES (?, ?, ?, ?, ?, ?, ?);`,
//     category.id,
//     category.name,
//     category.userId,
//     category.parentId,
//     category.accessLevel,
//     category.createdAt,
//     category.updatedAt
//   );

//   // Рекурсивно сохраняем подкатегории
//   if (category.subcategories && category.subcategories.length > 0) {
//     for (const subcategory of category.subcategories) {
//       await saveCategoryToSQLite(db, subcategory);
//     }
//   }
// };

// export default saveCategoryToSQLite;
