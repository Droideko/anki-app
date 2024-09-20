import {
  type SQLiteDatabase,
  SQLiteProvider as SQLiteProviderExpo,
  useSQLiteContext,
} from "expo-sqlite";
import { Platform } from "react-native";

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
    `);

    await db.runAsync(
      "INSERT INTO todos (value, intValue) VALUES (?, ?)",
      "hello",
      1
    );

    await db.runAsync(
      "INSERT INTO todos (value, intValue) VALUES (?, ?)",
      "world",
      2
    );

    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export function SQLiteProvider({ children }: any) {
  if (Platform.OS === "web") {
    return <>{children}</>;
  }

  return (
    <SQLiteProviderExpo
      databaseName="test.db"
      onInit={migrateDbIfNeeded}
      useSuspense
    >
      {children}
    </SQLiteProviderExpo>
  );
}
