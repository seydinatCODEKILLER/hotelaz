import { useAuthStore } from "@/stores/useAuthStore";

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  
  return {
    user,
    isAuthenticated,
    isLoading,
    logout,
  };
};