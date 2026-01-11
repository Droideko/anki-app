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

export default function SessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, getUserProfile, login, logout, signUp } =
    useUserRepository();
  const { showSnackbar } = useSnackbarStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await isAuthenticated();
        if (isAuth) {
          const userProfile = await getUserProfile();
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
          const user = await login(data);
          setUser(user);
        },
        signOut: async () => {
          await logout();
          setUser(null);
        },
        signUp: async (data: SignUpFormData) => {
          await signUp(data);
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
