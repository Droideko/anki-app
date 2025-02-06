// import * as SQLite from 'expo-sqlite';

// let dbInstance: SQLite.SQLiteDatabase | null = null;

// export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
//   console.log('createdDB');

//   if (dbInstance) {
//     return dbInstance;
//   }

//   dbInstance = await SQLite.openDatabaseAsync('anki.db');
//   await initializeDatabase(dbInstance);

//   return dbInstance;
// }

// async function initializeDatabase(db: SQLite.SQLiteDatabase) {
//   await db.execAsync(`
//     PRAGMA journal_mode = WAL;
//     PRAGMA foreign_keys = ON;

//     -- Таблица User
//     CREATE TABLE IF NOT EXISTS User (
//       id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//       email TEXT UNIQUE,
//       password TEXT,
//       name TEXT,
//       role TEXT DEFAULT 'USER',
//       hashedRefreshToken TEXT,
//       googleId TEXT UNIQUE,
//       createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
//       updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
//     );

//     -- Таблица Category
//     CREATE TABLE IF NOT EXISTS Category (
//       id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//       name TEXT NOT NULL,
//       userId INTEGER NOT NULL,
//       parentId INTEGER,
//       accessLevel TEXT DEFAULT 'PRIVATE',
//       type TEXT DEFAULT 'CATEGORY',
//       createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
//       updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY(userId) REFERENCES User(id) ON DELETE CASCADE,
//       FOREIGN KEY(parentId) REFERENCES Category(id) ON DELETE CASCADE
//     );

//     -- Таблица Deck
//     CREATE TABLE IF NOT EXISTS Deck (
//       id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//       name TEXT NOT NULL,
//       userId INTEGER NOT NULL,
//       categoryId INTEGER,
//       accessLevel TEXT DEFAULT 'PRIVATE',
//       type TEXT DEFAULT 'DECK',
//       createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
//       updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY(userId) REFERENCES User(id) ON DELETE CASCADE,
//       FOREIGN KEY(categoryId) REFERENCES Category(id) ON DELETE SET NULL
//     );

//     -- Таблица Card
//     CREATE TABLE IF NOT EXISTS Card (
//       id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//       front TEXT NOT NULL,
//       back TEXT NOT NULL,
//       deckId INTEGER NOT NULL,
//       createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
//       updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY(deckId) REFERENCES Deck(id) ON DELETE CASCADE
//     );

//     -- Таблица Tag
//     CREATE TABLE IF NOT EXISTS Tag (
//       id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//       name TEXT UNIQUE NOT NULL,
//       createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
//       updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
//     );

//     -- Связующая таблица для Card и Tag (CardTags)
//     CREATE TABLE IF NOT EXISTS CardTags (
//       cardId INTEGER NOT NULL,
//       tagId INTEGER NOT NULL,
//       PRIMARY KEY(cardId, tagId),
//       FOREIGN KEY(cardId) REFERENCES Card(id) ON DELETE CASCADE,
//       FOREIGN KEY(tagId) REFERENCES Tag(id) ON DELETE CASCADE
//     );

//     -- Таблица Progress
//     CREATE TABLE IF NOT EXISTS Progress (
//       id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//       userId INTEGER NOT NULL,
//       cardId INTEGER NOT NULL,
//       easeFactor REAL DEFAULT 2.5,
//       repetition INTEGER DEFAULT 0,
//       interval INTEGER DEFAULT 0,
//       status TEXT,
//       lastReviewed TEXT,
//       nextReview TEXT,
//       createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
//       updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY(userId) REFERENCES User(id) ON DELETE CASCADE,
//       FOREIGN KEY(cardId) REFERENCES Card(id) ON DELETE CASCADE
//     );

//     -- Таблица Achievement
//     CREATE TABLE IF NOT EXISTS Achievement (
//       id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
//       name TEXT NOT NULL,
//       description TEXT,
//       createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
//       updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
//     );

//     -- Таблица UserAchievement
//     CREATE TABLE IF NOT EXISTS UserAchievement (
//       userId INTEGER NOT NULL,
//       achievementId INTEGER NOT NULL,
//       achievedAt TEXT DEFAULT CURRENT_TIMESTAMP,
//       PRIMARY KEY(userId, achievementId),
//       FOREIGN KEY(userId) REFERENCES User(id) ON DELETE CASCADE,
//       FOREIGN KEY(achievementId) REFERENCES Achievement(id) ON DELETE CASCADE
//     );

//     -- Таблица CategoryAccess
//     CREATE TABLE IF NOT EXISTS CategoryAccess (
//       categoryId INTEGER NOT NULL,
//       userId INTEGER NOT NULL,
//       PRIMARY KEY(categoryId, userId),
//       FOREIGN KEY(categoryId) REFERENCES Category(id) ON DELETE CASCADE,
//       FOREIGN KEY(userId) REFERENCES User(id) ON DELETE CASCADE
//     );

//     -- Таблица DeckAccess
//     CREATE TABLE IF NOT EXISTS DeckAccess (
//       deckId INTEGER NOT NULL,
//       userId INTEGER NOT NULL,
//       PRIMARY KEY(deckId, userId),
//       FOREIGN KEY(deckId) REFERENCES Deck(id) ON DELETE CASCADE,
//       FOREIGN KEY(userId) REFERENCES User(id) ON DELETE CASCADE
//     );
//   `);

//   await addColumnIfNotExists(db, 'Category', 'type', "TEXT DEFAULT 'CATEGORY'");

//   // Проверяем и добавляем столбец 'type' в таблицу Deck
//   await addColumnIfNotExists(db, 'Deck', 'type', "TEXT DEFAULT 'DECK'");
// }

// async function addColumnIfNotExists(
//   db: SQLite.SQLiteDatabase,
//   tableName: string,
//   columnName: string,
//   columnDefinition: string,
// ) {
//   // Проверяем, есть ли столбец в таблице
//   const result = await db.getAllAsync(`PRAGMA table_info(${tableName});`);

//   const columnExists = result.some((column: any) => column.name === columnName);

//   if (!columnExists) {
//     // Добавляем столбец
//     await db.runAsync(
//       `ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDefinition};`,
//     );
//     console.log(`Столбец '${columnName}' добавлен в таблицу '${tableName}'.`);
//   }
// }
