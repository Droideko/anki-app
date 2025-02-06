import NetInfo from '@react-native-community/netinfo';

import useGetSQLiteContext from '@shared/utils/isWeb/useGetSQLiteContext';
import {
  deleteTokens,
  getAccessToken,
  saveTokens,
} from '@shared/utils/authTokens';
import { useUserStore } from '@shared/store/useUserStore';
import { User } from '@shared/types/auth';
import { LoginFormData, SignUpFormData } from '@shared/types/category';
import { authService } from '@shared/api/authService';
import { handleRepositoryError } from '@shared/utils/errorHandler';

export const useUserRepository = () => {
  const { setUser, clearUser } = useUserStore();
  const db = useGetSQLiteContext();

  const isAuthenticated = async (): Promise<boolean> => {
    const token = await getAccessToken();
    return token !== null;
  };

  const signUp = async (signUpData: SignUpFormData): Promise<User> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      try {
        const { user, accessToken, refreshToken } =
          await authService.signUp(signUpData);

        await saveTokens(accessToken, refreshToken);

        if (db) {
          await db.runAsync(
            'INSERT OR REPLACE INTO User (id, email, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);',
            user.id,
            user.email,
            user.name,
            user.role,
            new Date().toISOString(),
            new Date().toISOString(),
          );
        }

        return user;
      } catch (error) {
        handleRepositoryError(error);
      }
    } else {
      throw new Error(
        'No network connection. Please connect to the Internet and try again.',
      );
    }
  };

  const login = async (loginData: LoginFormData): Promise<User> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      const { user, accessToken, refreshToken } =
        await authService.login(loginData);

      await saveTokens(accessToken, refreshToken);

      // Сохранение пользователя в SQLite
      if (db) {
        await db.runAsync(
          'INSERT OR REPLACE INTO User (id, email, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);',
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
          'SELECT * FROM User WHERE email = ?;',
          loginData.email,
        );
        if (result) {
          // Проверяем пароль, если он хранится локально (хранение пароля в БД не рекомендуется)
          // Дополнительная логика проверки пароля может быть здесь
          return result;
        } else {
          throw new Error(
            'No network connection and no data in the local database',
          );
        }
      }
      throw new Error(
        'No network connection and no data in the local database',
      );
    }
  };

  const logout = async (): Promise<void> => {
    await deleteTokens();

    // Очищаем данные пользователя из локальной базы данных
    if (db) {
      // await db.runAsync('DELETE FROM User;');
    }

    clearUser();
  };

  const getUserProfile = async (): Promise<User> => {
    const networkState = await NetInfo.fetch();

    if (networkState.isConnected) {
      try {
        const user = await authService.getUserProfile();

        setUser(user);

        // Updating data in the local database
        if (db) {
          await db.runAsync(
            'INSERT OR REPLACE INTO User (id, email, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);',
            user.id,
            user.email,
            user.name,
            user.role,
            new Date().toISOString(),
            new Date().toISOString(),
          );
        }

        return user;
      } catch (error) {
        handleRepositoryError(error);
      }
    } else {
      if (db) {
        const result = await db.getFirstAsync<User>(
          'SELECT * FROM User LIMIT 1;',
        );
        if (result) {
          setUser(result);
          return result;
        } else {
          throw new Error('Нет данных в локальной базе');
        }
      }
      throw new Error('Нет данных в локальной базе');
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
