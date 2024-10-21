import { Deck } from "@/src/shared/types/deck";
import { SQLiteDatabase } from "expo-sqlite";

const getDecksFromSQLite = async (db: SQLiteDatabase): Promise<Deck[]> => {
  const decks = await db.getAllAsync<Deck>("SELECT * FROM Deck;");

  return decks;
};

export default getDecksFromSQLite;
