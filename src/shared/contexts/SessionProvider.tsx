import {
  useEffect,
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
} from "react";
import { SignUpFormData } from "@/src/features/authentication/types";
import { User } from "../types/auth";
import { useUserRepository } from "@/src/features/authentication/hooks/userRepository";

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuthenticated = await userRepository.isAuthenticated();
        if (isAuthenticated) {
          const userProfile = await userRepository.getUserProfile();
          setUser(userProfile);
        }
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
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
          // setIsLoading(true);
          try {
            const user = await userRepository.login(data);
            setUser(user);
          } catch (error) {
            throw error; // чтобы обработать ошибку в компоненте
          } finally {
            setIsLoading(false);
          }
        },
        signOut: async () => {
          setIsLoading(true);
          try {
            await userRepository.logout();
            setUser(null);
          } catch (error) {
            console.error("Ошибка при выходе:", error);
          } finally {
            setIsLoading(false);
          }
        },
        signUp: async (data: SignUpFormData) => {
          setIsLoading(true);
          try {
            const user = await userRepository.signUp(data);
            setUser(user);
          } catch (error) {
            console.error("Ошибка при регистрации:", error);
          } finally {
            setIsLoading(false);
          }
        },
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
