export interface Hotel {
  id: string
  nom: string
  adresse: string
  mail: string
  telephone: string
  prix_par_nuit: number
  device: 'FCFA' | 'EURO' | 'DOLLARS'
  statut: 'actif' | 'inactif'
  photo?: string
  created_at: string
  updated_at: string
  deleted_at?: string
  user_id: string
}

export interface CreateHotelData {
  nom: string
  adresse: string
  mail: string
  telephone: string
  prix_par_nuit: number
  device: 'FCFA' | 'EURO' | 'DOLLARS'
  statut?: 'actif' | 'inactif'
  photo?: File
}

export interface UpdateHotelData {
  nom?: string
  adresse?: string
  mail?: string
  telephone?: string
  prix_par_nuit?: number 
  device?: 'FCFA' | 'EURO' | 'DOLLARS'
  statut?: 'actif' | 'inactif'
  photo?: File
}

export interface HotelFilters {
  statut?: string
  device?: string
  prix_min?: number
  prix_max?: number
  search?: string
  sort_field?: string
  sort_direction?: 'asc' | 'desc'
  page?: number
  per_page?: number
}

export interface HotelsResponse {
  success: boolean
  data: Hotel[]
  pagination: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  filters?: HotelFilters
  meta: {
    total: number
    current_count: number
    has_more: boolean
  }
}