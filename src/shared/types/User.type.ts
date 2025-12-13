export interface User {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface UserData {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
}

export interface AuthData {
  email: string;
  password: string;
}
