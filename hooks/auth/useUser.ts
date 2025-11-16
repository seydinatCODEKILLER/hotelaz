import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/lib/authApi'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { User } from '@/types/auth'

interface ApiError {
  response?: {
    data?: {
      message?: string
      errors?: Record<string, string[]>
    }
  }
  message?: string
}

// Hook pour récupérer l'utilisateur connecté
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authApi.getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  })
}

// Hook pour mettre à jour l'avatar
export const useUpdateAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation<
    { success: boolean; message: string; avatar: string }, 
    AxiosError<ApiError>, 
    File
  >({
    mutationFn: (avatar) => authApi.updateAvatar(avatar),
    onSuccess: (response) => {
      // Mettre à jour le cache avec la nouvelle URL d'avatar
      queryClient.setQueryData(['currentUser'], (oldData: User | undefined) => {
        if (!oldData) return oldData
        return { 
          ...oldData, 
          avatar: response.avatar 
        }
      })
      toast.success(response.message)
    },
    onError: (error: AxiosError<ApiError>) => {
      const errorMessage = error.response?.data?.message || 'Erreur lors de la mise à jour de la photo'
      toast.error('Erreur', { description: errorMessage })
    },
  })
}