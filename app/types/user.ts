export interface UserSession {
  email: string;
  name: string;
}

export interface User {
  email: string;
  password: string;
  name: string;
}

export interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean | undefined;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
