import { useAuthStore } from '@/store/authStore'

export function useAuthHydration(): boolean {
    return useAuthStore((state) => state._hasHydrated)
}
