export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  avatar?: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  password_confirmation: string;
  avatar?: File;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  token_type: string;
}

export interface ApiError {
  message?: string;
  errors?: Record<string, string[]>;
}