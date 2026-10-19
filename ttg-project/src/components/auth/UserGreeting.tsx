'use client'

import { useAuthStore } from '@/store/authStore';

export default function UserGreeting() {
    const userEmail = useAuthStore((state) => state.userEmail);

    if (!userEmail) return null;

    return (
        <p className="text-sm text-muted-foreground">
            환영합니다, <span className="font-medium text-foreground">{userEmail}</span> 님
        </p>
    );
}
