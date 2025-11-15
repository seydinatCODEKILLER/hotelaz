import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { hotelsApi } from '@/lib/hotelsApi'
import type { Hotel, CreateHotelData, UpdateHotelData, HotelFilters } from '@/types/hotel'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

interface ApiError {
  response?: {
    data?: {
      message?: string
      errors?: Record<string, string[]>
    }
  }
  message?: string
}

// Hook pour récupérer la liste des hôtels
export const useHotels = (filters: HotelFilters = {}) => {
  return useQuery({
    queryKey: ['hotels', filters],
    queryFn: () => hotelsApi.getHotels(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Hook pour récupérer un hôtel spécifique
export const useHotel = (id: string) => {
  return useQuery({
    queryKey: ['hotel', id],
    queryFn: () => hotelsApi.getHotel(id),
    enabled: !!id,
  })
}

// Hook pour créer un hôtel
export const useCreateHotel = () => {
  const queryClient = useQueryClient()

  return useMutation<Hotel, AxiosError<ApiError>, CreateHotelData>({
    mutationFn: hotelsApi.createHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
      toast.success('Hôtel créé avec succès')
    },
    onError: (error: AxiosError<ApiError>) => {
      console.log(error);
      const errorMessage = error.response?.data?.message || 'Erreur lors de la création'
      toast.error('Erreur', { description: errorMessage })
    },
  })
}

// Hook pour modifier un hôtel
export const useUpdateHotel = () => {
  const queryClient = useQueryClient()

  return useMutation<
    Hotel, 
    AxiosError<ApiError>, 
    { id: string; data: UpdateHotelData }
  >({
    mutationFn: ({ id, data }) => hotelsApi.updateHotel(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] })
      queryClient.invalidateQueries({ queryKey: ['hotel', variables.id] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
      toast.success('Hôtel modifié avec succès')
    },
    onError: (error: AxiosError<ApiError>) => {
      const errorMessage = error.response?.data?.message || 'Erreur lors de la modification'
      toast.error('Erreur', { description: errorMessage })
    },
  })
}

// Hook pour supprimer un hôtel
export const useDeleteHotel = () => {
  const queryClient = useQueryClient()

  return useMutation<void, AxiosError<ApiError>, string>({
    mutationFn: hotelsApi.deleteHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
      toast.success('Hôtel supprimé avec succès')
    },
    onError: (error: AxiosError<ApiError>) => {
      const errorMessage = error.response?.data?.message || 'Erreur lors de la suppression'
      toast.error('Erreur', { description: errorMessage })
    },
  })
}

// Hook pour restaurer un hôtel
export const useRestoreHotel = () => {
  const queryClient = useQueryClient()

  return useMutation<void, AxiosError<ApiError>, string>({
    mutationFn: hotelsApi.restoreHotel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hotels'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] })
      toast.success('Hôtel restauré avec succès')
    },
    onError: (error: AxiosError<ApiError>) => {
      const errorMessage = error.response?.data?.message || 'Erreur lors de la restauration'
      toast.error('Erreur', { description: errorMessage })
    },
  })
}