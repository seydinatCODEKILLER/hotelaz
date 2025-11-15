import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { authApi } from '@/lib/authApi'
import type { LoginCredentials, AuthResponse, ApiError } from '@/types/auth'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const router = useRouter()

  return useMutation<AuthResponse, AxiosError<ApiError>, LoginCredentials>({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      setAuth(data)
      toast.success('Connexion réussie', {
        description: `Bienvenue ${data.user.prenom} !`,
      })
      router.push('/dashboard/analytics')
    },
    onError: (error: AxiosError<ApiError>) => {
      const errorData = error.response?.data
      const errorMessage = errorData?.message || 
        (errorData?.errors ? Object.values(errorData.errors).flat()[0] : '') || 
        'Erreur de connexion'
      
      toast.error('Erreur de connexion', {
        description: errorMessage,
      })
    },
  })
}