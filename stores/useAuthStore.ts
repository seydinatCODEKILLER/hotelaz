'use client'

import Cookies from 'js-cookie'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, AuthResponse } from '@/types/auth'
import { toast } from 'sonner'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setAuth: (data: AuthResponse) => void
  logout: (reason?: string) => void
  initializeAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: (data: AuthResponse) => {
        set({
          user: data.user,
          token: data.access_token,
          isAuthenticated: true,
          isLoading: false,
        })
        Cookies.set('auth-storage', data.access_token, { expires: 7 })
      },

      logout: (reason?: string) => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        })
        Cookies.remove('auth-storage')
        if (reason) {
          toast.error(reason)
        } else {
          toast.info('Déconnexion réussie')
        }
      },

      initializeAuth: () => {
        const token = Cookies.get('auth-storage') || get().token
        if (!token) {
          set({ isAuthenticated: false, isLoading: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token 
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          state.isAuthenticated = true
        }
      },
    }
  )
)