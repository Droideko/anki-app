import { SQLiteDatabase } from 'expo-sqlite';

const deleteCategoryFromSQLite = async (
  db: SQLiteDatabase,
  id: number,
  newParentId: number | null = null,
) => {
  if (newParentId !== null) {
    // Переносим подкатегории в другую категорию
    await db.runAsync(
      'UPDATE Category SET parentId = ? WHERE parentId = ?;',
      newParentId,
      id,
    );
    // Переносим колоды в новую категорию
    await db.runAsync(
      'UPDATE Deck SET categoryId = ? WHERE categoryId = ?;',
      newParentId,
      id,
    );
  } else {
    // Рекурсивно удаляем подкатегории и связанные колоды
    await deleteSubcategoriesAndDecksFromSQLite(db, id);
  }

  // Удаляем категорию
  await db.runAsync('DELETE FROM Category WHERE id = ?;', id);
};

const deleteSubcategoriesAndDecksFromSQLite = async (
  db: SQLiteDatabase,
  parentId: number,
) => {
  // Удаляем связанные колоды
  await db.runAsync('DELETE FROM Deck WHERE categoryId = ?;', parentId);

  const subcategories = await db.getAllAsync<{ id: number }>(
    'SELECT id FROM Category WHERE parentId = ?;',
    parentId,
  );

  for (const subcategory of subcategories) {
    // Рекурсивно удаляем подкатегории и их колоды
    await deleteSubcategoriesAndDecksFromSQLite(db, subcategory.id);

    // Удаляем подкатегорию
    await db.runAsync('DELETE FROM Category WHERE id = ?;', subcategory.id);
  }
};

export default deleteCategoryFromSQLite;

// const deleteCategoryFromSQLite = async (
//   db: SQLiteDatabase,
//   id: number,
//   newParentId: number | null = null
// ) => {
//   if (newParentId !== null) {
//     // Переносим подкатегории в другую категорию
//     await db.runAsync(
//       "UPDATE Category SET parentId = ? WHERE parentId = ?;",
//       newParentId,
//       id
//     );
//   } else {
//     // Рекурсивно удаляем подкатегории
//     await deleteSubcategoriesFromSQLite(db, id);
//   }

//   // Удаляем категорию
//   await db.runAsync("DELETE FROM Category WHERE id = ?;", id);
// };

// const deleteSubcategoriesFromSQLite = async (
//   db: SQLiteDatabase,
//   parentId: number
// ) => {
//   const subcategories = await db.getAllAsync<{ id: number }>(
//     "SELECT id FROM Category WHERE parentId = ?;",
//     parentId
//   );

//   for (const subcategory of subcategories) {
//     // Рекурсивно удаляем подкатегории
//     await deleteSubcategoriesFromSQLite(db, subcategory.id);

//     // Удаляем подкатегорию
//     await db.runAsync("DELETE FROM Category WHERE id = ?;", subcategory.id);
//   }
// };

// export default deleteCategoryFromSQLite;
