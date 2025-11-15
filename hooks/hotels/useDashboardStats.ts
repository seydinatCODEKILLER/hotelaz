import { useQuery } from '@tanstack/react-query'
import { statsApi } from '@/lib/statsApi'

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: statsApi.getStats,
  })
}

export const useGraphStats = () => {
  return useQuery({
    queryKey: ['graph-stats'],
    queryFn: statsApi.getGraphStats,
  })
}