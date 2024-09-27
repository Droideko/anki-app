import { useSQLiteContext } from "expo-sqlite";

const useUserRepository = () => {
  const db = useSQLiteContext();

  console.log("sqlite version", db.getFirstSync("SELECT sqlite_version()"));
};
