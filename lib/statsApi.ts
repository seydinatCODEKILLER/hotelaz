import { apiClient } from '@/lib/apiClient'

export interface StatsData {
  total_hotels: number
  hotels_actifs: number
  hotels_inactifs: number
  hotels_supprimes: number
}

export interface GraphData {
  mois: string
  total: number
}

export const statsApi = {
  getStats: async (): Promise<StatsData> => {
    const response = await apiClient.get('/hotels/statistiques')
    return response.data.data
  },

  getGraphStats: async (): Promise<GraphData[]> => {
    const response = await apiClient.get('/hotels/statistiques/graphiques')
    return response.data.data
  },
}