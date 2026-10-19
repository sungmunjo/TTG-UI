'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useAuthHydration } from '@/hooks/useAuthHydration';
import { createGroup } from '@/services/groupService';
import { Header } from '@/components/header/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users } from 'lucide-react';

export default function CreateGroupPage() {
    const router = useRouter();
    const userEmail = useAuthStore((state) => state.userEmail);
    const hasHydrated = useAuthHydration();

    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupImagePath, setGroupImagePath] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (hasHydrated && !userEmail) {
            router.replace('/');
        }
    }, [hasHydrated, userEmail, router]);

    if (!hasHydrated || !userEmail) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            await createGroup({
                groupName,
                groupDescription,
                groupImagePath: groupImagePath || undefined,
            });
            router.push('/dashboard');
        } catch (err) {
            setMessage('오류: ' + (err as Error).message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Button
                    variant="ghost"
                    className="mb-6 gap-2"
                    onClick={() => router.push('/dashboard')}
                >
                    <ArrowLeft className="h-4 w-4" />
                    대시보드로 돌아가기
                </Button>

                <Card>
                    <CardHeader className="space-y-1">
                        <div className="flex items-center gap-3">
                            <Users className="h-6 w-6 text-primary" />
                            <CardTitle className="text-2xl">그룹 만들기</CardTitle>
                        </div>
                        <CardDescription>
                            새 그룹을 만들고 팀원을 초대하세요.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="groupName">그룹 이름 <span className="text-destructive">*</span></Label>
                                <Input
                                    id="groupName"
                                    type="text"
                                    placeholder="그룹 이름을 입력하세요"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    maxLength={100}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="groupDescription">그룹 설명</Label>
                                <textarea
                                    id="groupDescription"
                                    placeholder="그룹에 대한 설명을 입력하세요 (선택)"
                                    value={groupDescription}
                                    onChange={(e) => setGroupDescription(e.target.value)}
                                    maxLength={500}
                                    rows={4}
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                                />
                                <p className="text-xs text-muted-foreground text-right">{groupDescription.length}/500</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="groupImagePath">그룹 이미지 URL</Label>
                                <Input
                                    id="groupImagePath"
                                    type="url"
                                    placeholder="https://example.com/image.png (선택)"
                                    value={groupImagePath}
                                    onChange={(e) => setGroupImagePath(e.target.value)}
                                    maxLength={500}
                                />
                            </div>

                            {message && (
                                <p className="text-sm text-destructive">{message}</p>
                            )}

                            <div className="flex gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => router.push('/dashboard')}
                                >
                                    취소
                                </Button>
                                <Button type="submit" className="flex-1" disabled={isLoading}>
                                    {isLoading ? '생성 중...' : '그룹 만들기'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
