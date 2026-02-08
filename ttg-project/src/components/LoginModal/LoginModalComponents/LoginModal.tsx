'use client'

import {useEffect, useState} from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";

type Props = {
    open: boolean
    onClose: () => void
}

export default function ModalDialog({ open, onClose }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    function setOpen(){
        open = !open;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 여기에 로그인 로직을 구현하세요
        console.log('로그인 시도:', { email, password });
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
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
