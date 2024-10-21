import { SQLiteDatabase } from "expo-sqlite";

const deleteDeckFromSQLite = async (db: SQLiteDatabase, id: number) => {
  // Удаляем колоду
  await db.runAsync("DELETE FROM Deck WHERE id = ?;", id);
};

export default deleteDeckFromSQLite;
