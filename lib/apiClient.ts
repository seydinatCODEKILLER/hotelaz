import axios, { type AxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/useAuthStore'
import { toast } from 'sonner'

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://hotel-backend-production-eaf0.up.railway.app/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

// Intercepteur de requêtes
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Intercepteur de réponses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response || {}

    if (status === 401) {
      return Promise.reject(error)
    }

    if (status === 403) {
      toast.error('Accès refusé', {
        description: data?.message || "Vous n'avez pas les permissions nécessaires.",
      })
    }

    if (status === 422) {
      // Laravel peut renvoyer { errors: {...} } ou directement { field: [...] }
      const errorMessages = data?.errors
        ? Object.values(data.errors).flat()
        : Object.values(data).flat()
    }

    if (status >= 500) {
      toast.error('Erreur serveur', {
        description: data?.message || 'Une erreur est survenue côté serveur.',
      })
    }

    return Promise.reject(error)
  }
)

export type RequestConfig<T = unknown> = AxiosRequestConfig<T>