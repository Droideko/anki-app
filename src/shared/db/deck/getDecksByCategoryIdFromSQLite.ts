import { SQLiteDatabase } from 'expo-sqlite';

import { Deck } from '@shared/types/deck';

const getDecksByCategoryIdFromSQLite = async (
  db: SQLiteDatabase,
  categoryId: number,
): Promise<Deck[]> => {
  const decks = await db.getAllAsync<Deck>(
    'SELECT * FROM Deck WHERE categoryId = ?;',
    categoryId,
  );

  return decks;
};

export default getDecksByCategoryIdFromSQLite;
