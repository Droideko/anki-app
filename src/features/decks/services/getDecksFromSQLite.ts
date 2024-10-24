import { SQLiteDatabase } from 'expo-sqlite';

import { Deck } from '@shared/types/deck';

const getDecksFromSQLite = async (db: SQLiteDatabase): Promise<Deck[]> => {
  const decks = await db.getAllAsync<Deck>('SELECT * FROM Deck;');

  return decks;
};

export default getDecksFromSQLite;
