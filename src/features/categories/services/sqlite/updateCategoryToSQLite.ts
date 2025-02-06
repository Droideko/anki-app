import { SQLiteDatabase } from 'expo-sqlite';

import { CategoryFormData } from '@features/categories/types';

const updateCategoryToSQLite = async (
  db: SQLiteDatabase,
  id: number,
  category: Partial<CategoryFormData>,
) => {
  await db.runAsync(
    `UPDATE Category SET
      name = COALESCE(?, name),
      parentId = COALESCE(?, parentId),
      accessLevel = COALESCE(?, accessLevel),
      updatedAt = ?
    WHERE id = ?;`,
    category.name ?? null,
    category.parentId ?? null,
    category.accessLevel ?? null,
    new Date().toISOString(),
    id,
  );
};

export default updateCategoryToSQLite;
