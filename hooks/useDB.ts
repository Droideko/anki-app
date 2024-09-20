import * as SQLite from "expo-sqlite";

interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: any; // TODO type
  updated_at: any; // TODO type
}

interface Deck {
  id: number;
  user_id: User["id"];
  name: string;
  description: string;
  // parent_deck_id: any // (FK to Decks.id, NULLABLE)
  created_at: any;
  updated_at: any;
}

interface Card {
  id: number;
  deck_id: Deck["id"];
  question: string;
  answer: string;
  created_at: any;
  updated_at: any;
}

export const useDB = async () => {
  const db = await SQLite.openDatabaseAsync('anki.db');

  const initDB = () => {
    const sql = `CREATE TABLE IF NOT EXISTS decks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
    )`
  };

  await db.execAsync(``)
  
};
