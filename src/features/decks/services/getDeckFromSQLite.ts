import { Deck } from "@/src/shared/types/deck";
import { SQLiteDatabase } from "expo-sqlite";

const getDeckFromSQLite = async (
  db: SQLiteDatabase,
  id: number
): Promise<Deck> => {
  const deck = await db.getFirstAsync<Deck>(
    "SELECT * FROM Deck WHERE id = ?;",
    id
  );

  if (!deck) {
    throw new Error("Колода не найдена в SQLite");
  }

  return deck;
};

export default getDeckFromSQLite;
