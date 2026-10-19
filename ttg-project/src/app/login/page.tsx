'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { login } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

export default function page() {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login({ userEmail, password });
            setUser(userEmail);
            router.push('/dashboard');
        } catch (err) {
            setMessage('❌ ' + (err as Error).message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl">로그인</CardTitle>
                    <CardDescription>
                        계정에 로그인하여 서비스를 이용하세요
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">이메일</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="your@email.com"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">비밀번호</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="비밀번호를 입력하세요"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                비밀번호를 잊으셨나요?
                            </button>
                        </div>

                        <Button type="submit" className="w-full">
                            로그인
                        </Button>

                        {message && (
                            <p className="text-sm text-center">{message}</p>
                        )}
                    </form>

                    <Separator />

                    <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                            아직 계정이 없으신가요?
                        </p>
                        <Button variant="outline" className="w-full">
                            회원가입
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
