import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { clearToken } from '@/lib/api'

interface AuthState {
    userEmail: string | null
    _hasHydrated: boolean
    setUser: (email: string) => void
    logout: () => void
    setHasHydrated: (value: boolean) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            userEmail: null,
            _hasHydrated: false,
            setUser: (email) => set({ userEmail: email }),
            logout: () => {
                clearToken()
                set({ userEmail: null })
            },
            setHasHydrated: (value) => set({ _hasHydrated: value }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ userEmail: state.userEmail }),
            onRehydrateStorage: () => (state) => {
                // state가 null일 경우(저장 데이터 없음)에도 setState로 직접 처리
                if (state) {
                    state.setHasHydrated(true)
                } else {
                    useAuthStore.setState({ _hasHydrated: true })
                }
            },
        }
    )
)
