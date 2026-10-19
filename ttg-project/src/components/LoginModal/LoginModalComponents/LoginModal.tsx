'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import { login } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

type Props = {
    open: boolean
    onClose: () => void
}

export default function ModalDialog({ open, onClose }: Props) {
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
            onClose();
            router.push('/dashboard');
        } catch (err) {
            setMessage('❌ ' + (err as Error).message);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-900/50"/>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel className="w-1/4 relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline outline-white/10">
                        <Card className="min-w-min w-full">
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
                                    <Link href={"/register"}>
                                        <Button variant="outline" className="w-full">
                                            회원가입
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
