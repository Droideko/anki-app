import { renderHook } from '@testing-library/react-native';
import NetInfo from '@react-native-community/netinfo';
import { useSQLiteContext } from 'expo-sqlite';
import * as SecureStore from 'expo-secure-store';

jest.mock('@/src/api/apiService');
jest.mock('@react-native-community/netinfo');
jest.mock('expo-sqlite');
jest.mock('@/src/store/useUserStore');
jest.mock('@/src/api/utils/auth');
jest.mock('@/src/utils/isWeb');
jest.mock('expo-secure-store');

// Import the modules you're mocking
import { apiService } from '@shared/api/apiService';
import { useUserRepository } from '@shared/hooks/repository/userRepository';
import { useUserStore } from '@shared/store/useUserStore';
import * as authUtils from '@shared/utils/authTokens';
import isWeb from '@shared/utils/isWeb/useGetSQLiteContext.native';

// Start writing your tests
describe('useUserRepository', () => {
  describe('isAuthenticated', () => {
    test('returns true when access token exists', async () => {
      const getAccessTokenMock =
        authUtils.getAccessToken as jest.MockedFunction<
          typeof authUtils.getAccessToken
        >;
      getAccessTokenMock.mockResolvedValue('some-token');

      const { result } = renderHook(() => useUserRepository());

      const isAuthenticated = await result.current.isAuthenticated();

      expect(isAuthenticated).toBe(true);
      expect(getAccessTokenMock).toHaveBeenCalled();
    });

    test('returns false when access token does not exist', async () => {
      const getAccessTokenMock =
        authUtils.getAccessToken as jest.MockedFunction<
          typeof authUtils.getAccessToken
        >;
      getAccessTokenMock.mockResolvedValue(null);

      const { result } = renderHook(() => useUserRepository());

      const isAuthenticated = await result.current.isAuthenticated();

      expect(isAuthenticated).toBe(false);
      expect(getAccessTokenMock).toHaveBeenCalled();
    });
  });

  describe('signUp', () => {
    test('successfully registers a user when online', async () => {
      const { saveTokens } = authUtils;

      (useUserStore as jest.MockedFunction<any>).mockReturnValue({
        setUser: jest.fn(),
        clearUser: jest.fn(),
      });

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      };

      const mockResponse = {
        data: {
          user: mockUser,
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        },
      };

      (apiService.signUp as jest.MockedFunction<any>).mockResolvedValue(
        mockResponse,
      );
      (NetInfo.fetch as jest.MockedFunction<any>).mockResolvedValue({
        isConnected: true,
      });

      const mockDb = {
        runAsync: jest.fn(),
      };

      (useSQLiteContext as jest.Mock).mockReturnValue(mockDb);

      const { result } = renderHook(() => useUserRepository());

      const signUpData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      const user = await result.current.signUp(signUpData);

      expect(apiService.signUp).toHaveBeenCalledWith(signUpData);
      expect(saveTokens).toHaveBeenCalledWith('access-token', 'refresh-token');
      expect(mockDb.runAsync).toHaveBeenCalledWith(
        'INSERT OR REPLACE INTO User (id, email, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);',
        mockUser.id,
        mockUser.email,
        mockUser.name,
        mockUser.role,
        expect.any(String),
        expect.any(String),
      );
      expect(user).toEqual(mockUser);
    });

    test('throws error when offline', async () => {
      (NetInfo.fetch as jest.MockedFunction<any>).mockResolvedValue({
        isConnected: false,
      });

      const { result } = renderHook(() => useUserRepository());

      const signUpData = {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      };

      await expect(result.current.signUp(signUpData)).rejects.toThrow(
        'Нет подключения к сети. Пожалуйста, подключитесь к Интернету и попробуйте снова.',
      );
    });
  });

  describe('login', () => {
    test('successfully logs in a user when online', async () => {
      const { saveTokens } = authUtils;
      (useUserStore as jest.MockedFunction<any>).mockReturnValue({
        setUser: jest.fn(),
        clearUser: jest.fn(),
      });

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      };

      const mockResponse = {
        data: {
          user: mockUser,
          accessToken: 'access-token',
          refreshToken: 'refresh-token',
        },
      };

      (apiService.login as jest.MockedFunction<any>).mockResolvedValue(
        mockResponse,
      );
      (NetInfo.fetch as jest.MockedFunction<any>).mockResolvedValue({
        isConnected: true,
      });

      const mockDb = {
        runAsync: jest.fn(),
      };
      (useSQLiteContext as jest.Mock).mockReturnValue(mockDb);

      const { result } = renderHook(() => useUserRepository());

      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user = await result.current.login(loginData);

      expect(apiService.login).toHaveBeenCalledWith(loginData);
      expect(saveTokens).toHaveBeenCalledWith('access-token', 'refresh-token');
      expect(mockDb.runAsync).toHaveBeenCalledWith(
        'INSERT OR REPLACE INTO User (id, email, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);',
        mockUser.id,
        mockUser.email,
        mockUser.name,
        mockUser.role,
        expect.any(String),
        expect.any(String),
      );
      expect(user).toEqual(mockUser);
    });

    test('retrieves user from local DB when offline and user exists', async () => {
      (NetInfo.fetch as jest.MockedFunction<any>).mockResolvedValue({
        isConnected: false,
      });

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      };

      const mockDb = {
        getFirstAsync: jest.fn().mockResolvedValue(mockUser),
      };
      (useSQLiteContext as jest.Mock).mockReturnValue(mockDb);

      const { result } = renderHook(() => useUserRepository());

      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user = await result.current.login(loginData);

      expect(mockDb.getFirstAsync).toHaveBeenCalledWith(
        'SELECT * FROM User WHERE email = ?;',
        loginData.email,
      );
      expect(user).toEqual(mockUser);
    });

    test('throws error when offline and user does not exist in local DB', async () => {
      (NetInfo.fetch as jest.MockedFunction<any>).mockResolvedValue({
        isConnected: false,
      });

      const mockDb = {
        getFirstAsync: jest.fn().mockResolvedValue(null),
      };
      (useSQLiteContext as jest.Mock).mockReturnValue(mockDb);

      const { result } = renderHook(() => useUserRepository());

      const loginData = {
        email: 'test@example.com',
        password: 'password123',
      };

      await expect(result.current.login(loginData)).rejects.toThrow(
        'Нет подключения к сети и данных в локальной базе',
      );
    });
  });

  describe('logout', () => {
    test('clears tokens and user data', async () => {
      const { deleteTokens } = authUtils;
      const clearUser = jest.fn();
      (useUserStore as jest.MockedFunction<any>).mockReturnValue({
        clearUser,
        setUser: jest.fn(),
      });

      const mockDb = {
        runAsync: jest.fn(),
      };
      (useSQLiteContext as jest.Mock).mockReturnValue(mockDb);

      const { result } = renderHook(() => useUserRepository());

      await result.current.logout();

      expect(deleteTokens).toHaveBeenCalled();
      expect(mockDb.runAsync).toHaveBeenCalledWith('DELETE FROM User;');
      expect(clearUser).toHaveBeenCalled();
    });
  });

  describe('getUserProfile', () => {
    test('retrieves user from API when online', async () => {
      const setUser = jest.fn();
      (useUserStore as jest.MockedFunction<any>).mockReturnValue({
        setUser,
        clearUser: jest.fn(),
      });

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      };

      const mockResponse = {
        data: mockUser,
      };

      (apiService.getUserProfile as jest.MockedFunction<any>).mockResolvedValue(
        mockResponse,
      );
      (NetInfo.fetch as jest.MockedFunction<any>).mockResolvedValue({
        isConnected: true,
      });

      const mockDb = {
        runAsync: jest.fn(),
      };
      (useSQLiteContext as jest.Mock).mockReturnValue(mockDb);

      const { result } = renderHook(() => useUserRepository());

      const user = await result.current.getUserProfile();

      expect(apiService.getUserProfile).toHaveBeenCalled();
      expect(setUser).toHaveBeenCalledWith(mockUser);
      expect(mockDb.runAsync).toHaveBeenCalledWith(
        'INSERT OR REPLACE INTO User (id, email, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?);',
        mockUser.id,
        mockUser.email,
        mockUser.name,
        mockUser.role,
        expect.any(String),
        expect.any(String),
      );
      expect(user).toEqual(mockUser);
    });

    test('retrieves user from local DB when offline', async () => {
      const setUser = jest.fn();
      (useUserStore as jest.MockedFunction<any>).mockReturnValue({
        setUser,
        clearUser: jest.fn(),
      });

      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
      };

      (NetInfo.fetch as jest.MockedFunction<any>).mockResolvedValue({
        isConnected: false,
      });

      const mockDb = {
        getFirstAsync: jest.fn().mockResolvedValue(mockUser),
      };
      (useSQLiteContext as jest.Mock).mockReturnValue(mockDb);

      const { result } = renderHook(() => useUserRepository());

      const user = await result.current.getUserProfile();

      expect(mockDb.getFirstAsync).toHaveBeenCalledWith(
        'SELECT * FROM User LIMIT 1;',
      );
      expect(setUser).toHaveBeenCalledWith(mockUser);
      expect(user).toEqual(mockUser);
    });

    test('throws error when offline and no user in local DB', async () => {
      (NetInfo.fetch as jest.MockedFunction<any>).mockResolvedValue({
        isConnected: false,
      });

      const mockDb = {
        getFirstAsync: jest.fn().mockResolvedValue(null),
      };
      (useSQLiteContext as jest.Mock).mockReturnValue(mockDb);

      const { result } = renderHook(() => useUserRepository());

      await expect(result.current.getUserProfile()).rejects.toThrow(
        'Нет данных в локальной базе',
      );
    });
  });
});
