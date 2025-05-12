export type User = {
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
  id: string;
  name: string;
  email: string;
  nativeLanguage?: string;
  targetLanguage?: string;
  languageLevel?: string;
  isFirstLogin: boolean;
  isHaptic: boolean;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponse = {
  user: User;
} & Tokens;
