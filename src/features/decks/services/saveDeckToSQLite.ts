import { Deck } from "@/src/shared/types/deck";
import { SQLiteDatabase } from "expo-sqlite";

const saveDeckToSQLite = async (db: SQLiteDatabase, deck: Deck) => {
  // Вставляем или обновляем колоду
  await db.runAsync(
    `INSERT OR REPLACE INTO Deck (
      id, name, userId, categoryId, accessLevel, type, createdAt, updatedAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    deck.id,
    deck.name,
    deck.userId,
    deck.categoryId,
    deck.accessLevel,
    deck.type,
    deck.createdAt,
    deck.updatedAt
  );

  // Если у вас есть связанные карточки (cards), вы можете также сохранить их здесь
  // Например:
  // if (deck.cards && deck.cards.length > 0) {
  //   for (const card of deck.cards) {
  //     await saveCardToSQLite(db, card);
  //   }
  // }
};

export default saveDeckToSQLite;
