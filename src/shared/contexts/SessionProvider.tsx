import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  type PropsWithChildren,
} from 'react';

import { User } from '@shared/types/auth';
import { useUserRepository } from '@shared/hooks/repository/userRepository';
import { SignUpFormData } from '@shared/types/category';
import useSnackbarStore from '@shared/store/useSnackbarStore';
import { SNACKBAR_TYPE } from '@shared/constants/snackbar';

export function useSession() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useSession must be wrapped in a <SessionProvider />');
  }

  return context;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  signIn: (data: SignUpFormData) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (data: SignUpFormData) => Promise<void>;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userRepository = useUserRepository();
  const { showSnackbar } = useSnackbarStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await userRepository.isAuthenticated();
        if (isAuthenticated) {
          const userProfile = await userRepository.getUserProfile();
          setUser(userProfile);
        }
      } catch (error: unknown) {
        showSnackbar(
          `Error checking authorization: ${error}`,
          SNACKBAR_TYPE.ERROR,
        );
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (data: SignUpFormData) => {
          const user = await userRepository.login(data);
          setUser(user);
        },
        signOut: async () => {
          await userRepository.logout();
          setUser(null);
        },
        signUp: async (data: SignUpFormData) => {
          await userRepository.signUp(data);
          setUser(user);
        },
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
