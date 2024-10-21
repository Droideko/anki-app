import {
  LoginFormData,
  SignUpFormData,
} from "@/src/features/authentication/types";
import { apiService } from "../../../shared/api/apiService";
import NetInfo from "@react-native-community/netinfo";
import {
  deleteTokens,
  getAccessToken,
  saveTokens,
} from "@/src/shared/utils/authTokens";
import { useSQLiteContext } from "expo-sqlite";
import isWeb from "@/src/shared/utils/isWeb";
import { useUserStore } from "@/src/shared/store/useUserStore";
import { User } from "@/src/shared/types/auth";

export const useUserRepository = () => {
  const { setUser, clearUser } = useUserStore();
  const db = isWeb() ? null : useSQLiteContext();
  const isAuthenticated = async (): Promise<boolean> => {
    const token = await getAccessToken();
    return token !== null;
  };

  const signUp = async (signUpData: SignUpFormData): Promise<User> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      const response = await apiService.signUp(signUpData);

      const { user, accessToken, refreshToken } = response.data;

      await saveTokens(accessToken, refreshToken);

      if (db) {
        await db.runAsync(
          "INSERT OR REPLACE INTO User (id, email, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);",
          user.id,
          user.email,
          user.name,
          user.role,
          new Date().toISOString(),
          new Date().toISOString(),
        );
      }

      return user;
    } else {
      throw new Error(
        "Нет подключения к сети. Пожалуйста, подключитесь к Интернету и попробуйте снова.",
      );
    }
  };

  const login = async (loginData: LoginFormData): Promise<User> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      const response = await apiService.login(loginData);

      const { user, accessToken, refreshToken } = response.data;

      await saveTokens(accessToken, refreshToken);

      // Сохранение пользователя в SQLite
      if (db) {
        await db.runAsync(
          "INSERT OR REPLACE INTO User (id, email, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);",
          user.id,
          user.email,
          user.name,
          user.role,
          new Date().toISOString(),
          new Date().toISOString(),
        );
      }

      return user;
    } else {
      // Получение пользователя из локальной базы данных
      if (db) {
        const result = await db.getFirstAsync<User>(
          "SELECT * FROM User WHERE email = ?;",
          loginData.email,
        );

        if (result) {
          // Проверяем пароль, если он хранится локально (хранение пароля в БД не рекомендуется)
          // Дополнительная логика проверки пароля может быть здесь
          return result;
        } else {
          throw new Error("Нет подключения к сети и данных в локальной базе");
        }
      }
      throw new Error("Нет подключения к сети и данных в локальной базе");
    }
  };

  const logout = async (): Promise<void> => {
    await deleteTokens();

    // Очищаем данные пользователя из локальной базы данных
    if (db) {
      await db.runAsync("DELETE FROM User;");
    }

    clearUser();
  };

  const getUserProfile = async (): Promise<User> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      const response = await apiService.getUserProfile();
      const user = response.data;

      setUser(user);

      // Обновляем данные в локальной базе данных
      if (db) {
        await db.runAsync(
          "INSERT OR REPLACE INTO User (id, email, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);",
          user.id,
          user.email,
          user.name,
          user.role,
          new Date().toISOString(),
          new Date().toISOString(),
        );
      }

      return user;
    } else {
      if (db) {
        const result = await db.getFirstAsync<User>(
          "SELECT * FROM User LIMIT 1;",
        );

        if (result) {
          setUser(result);
          return result;
        } else {
          throw new Error("Нет данных в локальной базе");
        }
      }
      throw new Error("Нет данных в локальной базе");
    }
  };

  return {
    isAuthenticated,
    signUp,
    login,
    logout,
    getUserProfile,
  };
};

// export const userRepository = {
//   isAuthenticated: async (): Promise<boolean> => {
//     const token = await getAccessToken();
//     return token !== null;
//   },

//   signUp: async (signUpData: SignUpFormData): Promise<User> => {
//     const networkState = await NetInfo.fetch();

//     if (networkState.isConnected) {
//       const response = await apiService.signUp(signUpData);

//       const { user, accessToken, refreshToken } = response.data;

//       await saveTokens(accessToken, refreshToken);

//       if (Platform.OS !== "web") {
//         const db = await getDatabase();
//         await db.runAsync(
//           "INSERT OR REPLACE INTO User (id, email, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);",
//           user.id,
//           user.email,
//           user.name,
//           user.role,
//           new Date().toISOString(),
//           new Date().toISOString()
//         );
//       }

//       return user;
//     } else {
//       throw new Error(
//         "Нет подключения к сети. Пожалуйста, подключитесь к Интернету и попробуйте снова."
//       );
//     }
//   },

//   login: async (loginData: LoginFormData): Promise<User> => {
//     const networkState = await NetInfo.fetch();

//     if (networkState.isConnected) {
//       const response = await apiService.login(loginData);

//       const { user, accessToken, refreshToken } = response.data;

//       await saveTokens(accessToken, refreshToken);

//       // Сохранение пользователя в SQLite
//       const db = await getDatabase();
//       await db.runAsync(
//         "INSERT OR REPLACE INTO User (id, email, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);",
//         user.id,
//         user.email,
//         user.name,
//         user.role,
//         new Date().toISOString(),
//         new Date().toISOString()
//       );

//       return user;
//     } else {
//       // Получение пользователя из локальной базы данных
//       const db = await getDatabase();
//       const result = await db.getFirstAsync<User>(
//         "SELECT * FROM User WHERE email = ?;",
//         loginData.email
//       );

//       if (result) {
//         // Проверяем пароль, если он хранится локально (хранение пароля в БД не рекомендуется)
//         // Дополнительная логика проверки пароля может быть здесь
//         return result;
//       } else {
//         throw new Error("Нет подключения к сети и данных в локальной базе");
//       }
//     }
//   },

//   logout: async (): Promise<void> => {
//     await deleteTokens();

//     // Очищаем данные пользователя из локальной базы данных
//     const db = await getDatabase();
//     await db.runAsync("DELETE FROM User;");
//   },

//   getUserProfile: async (): Promise<User> => {
//     const networkState = await NetInfo.fetch();

//     if (networkState.isConnected) {
//       const response = await apiService.getUserProfile();
//       const user = response.data;

//       // Обновляем данные в локальной базе данных
//       if (Platform.OS !== "web") {
//         const db = await getDatabase();
//         await db.runAsync(
//           "INSERT OR REPLACE INTO User (id, email, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);",
//           user.id,
//           user.email,
//           user.name,
//           user.role,
//           new Date().toISOString(),
//           new Date().toISOString()
//         );
//       }

//       return user;
//     } else {
//       const db = await getDatabase();
//       const result = await db.getFirstAsync<User>(
//         "SELECT * FROM User LIMIT 1;"
//       );

//       if (result) {
//         return result;
//       } else {
//         throw new Error("Нет данных в локальной базе");
//       }
//     }
//   },
// };
