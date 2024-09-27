import { SignUpFormData } from "@/components/auth/types";
import { apiService } from "../../api/apiService";
// import { executeSql } from "../../db/database";
// import { User } from "../models/userModel";
import NetInfo from "@react-native-community/netinfo";
import { deleteTokens, getAccessToken, saveTokens } from "@/src/api/utils/auth";
import { User } from "@/src/types/auth";

export const userRepository = {
  isAuthenticated: async (): Promise<boolean> => {
    const token = await getAccessToken();
    return token !== null;
  },

  signUp: async (signUpData: SignUpFormData): Promise<User> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      const response = await apiService.signUp(signUpData);

      const { user, accessToken, refreshToken } = response.data;

      await saveTokens(accessToken, refreshToken);

      // Сохранение пользователя в SQLite
      // await executeSql(
      //   'INSERT OR REPLACE INTO users (id, email, name, role) VALUES (?, ?, ?, ?);',
      //   [user.id, user.email, user.name, user.role]
      // );

      return user;
    } else {
      throw new Error(
        "Нет подключения к сети. Пожалуйста, подключитесь к Интернету и попробуйте снова."
      );
    }
  },

  login: async (signUpData: SignUpFormData): Promise<User> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      // Если есть подключение, выполняем сетевой запрос
      const response = await apiService.login(signUpData);

      const { user, accessToken, refreshToken } = response.data;

      await saveTokens(accessToken, refreshToken);

      // const user = response.data;

      // Сохраняем пользователя в локальную базу данных
      // await executeSql(
      //   "INSERT OR REPLACE INTO users (id, name, email) VALUES (?, ?, ?);",
      //   [user.id, user.name, user.email]
      // );

      return user;
    } else {
      // Если нет подключения, пытаемся получить данные из локальной базы
      // const result = await executeSql("SELECT * FROM users WHERE email = ?;", [
      //   email,
      // ]);

      // if (result.rows.length > 0) {
      //   return result.rows.item(0) as User;
      // } else {
      throw new Error("Нет подключения к сети и данных в локальной базе");
      // }
    }
  },

  logout: async (): Promise<void> => {
    await deleteTokens();
    // Можно также очистить данные пользователя из локальной базы данных, если необходимо
    // await executeSql('DELETE FROM users;', []);
  },

  getUserProfile: async (): Promise<User> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      const response = await apiService.getUserProfile();
      const user = response.data;

      // Обновляем данные в локальной базе данных
      // await executeSql(
      //   "INSERT OR REPLACE INTO users (id, email, name, role) VALUES (?, ?, ?, ?);",
      //   [user.id, user.email, user.name, user.role]
      // );

      return user;
    } else {
      // Получаем данные из локальной базы данных
      // const result = await executeSql("SELECT * FROM users LIMIT 1;", []);
      // if (result.rows.length > 0) {
      //   return result.rows.item(0) as User;
      // } else {
      throw new Error("Нет данных в локальной базе");
      // }
    }
  },

  // Добавляйте другие методы репозитория
};
