import { apiClient } from '@/lib/apiClient'
import type { Hotel, CreateHotelData, UpdateHotelData, HotelsResponse, HotelFilters } from '@/types/hotel'

export const hotelsApi = {
  // Lister les hôtels avec filtres et pagination
  getHotels: async (filters: HotelFilters = {}): Promise<HotelsResponse> => {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString())
      }
    })

    const response = await apiClient.get<HotelsResponse>(`/hotels?${params}`)
    return response.data
  },

  // Récupérer un hôtel spécifique
  getHotel: async (id: string): Promise<Hotel> => {
    const response = await apiClient.get<{ success: boolean; data: Hotel }>(`/hotels/${id}`)
    return response.data.data
  },

  // Créer un hôtel
  createHotel: async (data: CreateHotelData): Promise<Hotel> => {
    const formData = new FormData()
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === 'photo' && value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, value.toString())
        }
      }
    })

    const response = await apiClient.post<{ success: boolean; data: Hotel }>(
      '/hotels',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data.data
  },

  // Modifier un hôtel
    updateHotel: async (id: string, data: UpdateHotelData): Promise<Hotel> => {
    // Nettoyer les données avant envoi
    const cleanData: UpdateHotelData = { ...data };
    
    // Supprimer la photo si elle est présente (gérée séparément)
    if ('photo' in cleanData) {
      delete cleanData.photo;
    }

    const response = await apiClient.put<{ success: boolean; data: Hotel }>(
      `/hotels/${id}`,
      cleanData
    )
    return response.data.data
  },

  // Supprimer un hôtel (soft delete)
  deleteHotel: async (id: string): Promise<void> => {
    await apiClient.delete(`/hotels/${id}`)
  },

  // Restaurer un hôtel
  restoreHotel: async (id: string): Promise<void> => {
    await apiClient.patch(`/hotels/${id}/restore`)
  },

  // Mettre à jour la photo
  updatePhoto: async (id: string, photo: File): Promise<string> => {
    const formData = new FormData()
    formData.append('photo', photo)

    const response = await apiClient.post<{ success: boolean; photo: string }>(
      `/hotels/${id}/update-photo`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return response.data.photo
  },
}