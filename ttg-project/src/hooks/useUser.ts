import useSWR from 'swr'
import { api } from '@/lib/api'

interface UserProfile {
    userEmail: string
    name: string
}

const fetcher = (path: string) => api.get<UserProfile>(path)

export function useUser() {
    const { data, error, isLoading } = useSWR('/users/me', fetcher)

    return {
        user: data,
        isLoading,
        isError: !!error,
    }
}
