import { apiClient } from '@/lib/apiClient'
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '@/types/auth'
import { User } from '../types/auth'

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      '/auth/login',
      credentials
    )
    return response.data
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const formData = new FormData()
    formData.append('nom', credentials.nom)
    formData.append('prenom', credentials.prenom)
    formData.append('email', credentials.email)
    formData.append('password', credentials.password)
    formData.append('password_confirmation', credentials.password_confirmation)
    
    if (credentials.avatar) {
      formData.append('avatar', credentials.avatar)
    }

    const response = await apiClient.post<AuthResponse>(
      '/auth/register',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get('/auth/user')
    return response.data
  },
  
  updateAvatar: async (avatar: File): Promise<{ success: boolean; message: string; avatar: string }> => {
    const formData = new FormData()
    formData.append('avatar', avatar)

    const response = await apiClient.post<{ 
      success: boolean; 
      message: string; 
      avatar: string 
    }>(
      '/auth/update-avatar',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data
  },
}