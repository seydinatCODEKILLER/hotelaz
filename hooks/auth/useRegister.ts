import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/useAuthStore'
import { authApi } from '@/lib/authApi'
import type { RegisterCredentials, AuthResponse, ApiError } from '@/types/auth'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const router = useRouter()

  return useMutation<AuthResponse, AxiosError<ApiError>, RegisterCredentials>({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      setAuth(data)
      toast.success('Inscription réussie', {
        description: `Bienvenue ${data.user.prenom} !`,
      })
      router.push('/dashboard/analytics')
    },
    onError: (error: AxiosError<ApiError>) => {
  const errorData = error.response?.data;
  let errorMessage = "Erreur lors de l'inscription";

  if (errorData && typeof errorData === "object") {
  errorMessage = Object.values(errorData).flat().join(', ');
} else if (typeof errorData === "string") {
  errorMessage = errorData;
}

  toast.error("Erreur d'inscription", {
    description: errorMessage,
  });
},
  })
}
