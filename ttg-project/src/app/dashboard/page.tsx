'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useAuthHydration } from '@/hooks/useAuthHydration';
import { useUser } from '@/hooks/useUser';
import { joinGroup } from '@/services/groupService';
import { Header } from '@/components/header/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Video, Users, Calendar, Plus, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
    const router = useRouter();
    const userEmail = useAuthStore((state) => state.userEmail);
    const hasHydrated = useAuthHydration();
    const { user, isLoading } = useUser();

    const [joinDialogOpen, setJoinDialogOpen] = useState(false);
    const [groupId, setGroupId] = useState('');
    const [joinMessage, setJoinMessage] = useState('');
    const [isJoining, setIsJoining] = useState(false);

    useEffect(() => {
        if (hasHydrated && !userEmail) {
            router.replace('/');
        }
    }, [hasHydrated, userEmail, router]);

    if (!hasHydrated) return null;
    if (!userEmail) return null;

    const handleJoinGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsJoining(true);
        setJoinMessage('');

        try {
            await joinGroup({ groupId: Number(groupId) });
            setJoinDialogOpen(false);
            setGroupId('');
        } catch (err) {
            setJoinMessage('오류: ' + (err as Error).message);
        } finally {
            setIsJoining(false);
        }
    };

    const handleDialogClose = (open: boolean) => {
        setJoinDialogOpen(open);
        if (!open) {
            setGroupId('');
            setJoinMessage('');
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-semibold text-foreground mb-2">
                    안녕하세요, {isLoading ? userEmail : (user?.name ?? userEmail)} 님
                </h1>
                <p className="text-muted-foreground mb-10">오늘도 VirtuMeet과 함께 하세요.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center space-x-3">
                            <Video className="h-6 w-6 text-primary" />
                            <CardTitle className="text-lg">회의 시작</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm mb-4">새 화상회의를 즉시 시작하세요.</p>
                            <Button className="w-full">바로 시작</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center space-x-3">
                            <Calendar className="h-6 w-6 text-primary" />
                            <CardTitle className="text-lg">회의 예약</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm mb-4">팀과 일정을 잡고 예약하세요.</p>
                            <Button variant="outline" className="w-full">예약하기</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center space-x-3">
                            <Users className="h-6 w-6 text-primary" />
                            <CardTitle className="text-lg">회의 참여</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground text-sm mb-4">초대 링크나 코드로 참여하세요.</p>
                            <Button variant="outline" className="w-full">참여하기</Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-12">
                    <h2 className="text-xl font-semibold text-foreground mb-6">내 그룹</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-dashed hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push('/dashboard/groups/create')}>
                            <CardHeader className="flex flex-row items-center space-x-3">
                                <Plus className="h-6 w-6 text-primary" />
                                <CardTitle className="text-lg">그룹 만들기</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm mb-4">
                                    새 그룹을 만들고 팀원들을 초대하세요.
                                </p>
                                <Button
                                    className="w-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push('/dashboard/groups/create');
                                    }}
                                >
                                    그룹 만들기
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setJoinDialogOpen(true)}>
                            <CardHeader className="flex flex-row items-center space-x-3">
                                <UserPlus className="h-6 w-6 text-primary" />
                                <CardTitle className="text-lg">그룹 참여</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground text-sm mb-4">
                                    그룹 ID를 입력해 기존 그룹에 참여하세요.
                                </p>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setJoinDialogOpen(true);
                                    }}
                                >
                                    그룹 참여
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Dialog open={joinDialogOpen} onOpenChange={handleDialogClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>그룹 참여</DialogTitle>
                        <DialogDescription>
                            참여할 그룹의 ID를 입력하세요.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleJoinGroup} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="groupId">그룹 ID</Label>
                            <Input
                                id="groupId"
                                type="number"
                                placeholder="그룹 ID를 입력하세요"
                                value={groupId}
                                onChange={(e) => setGroupId(e.target.value)}
                                min={1}
                                required
                            />
                        </div>
                        {joinMessage && (
                            <p className="text-sm text-destructive">{joinMessage}</p>
                        )}
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => handleDialogClose(false)}>
                                취소
                            </Button>
                            <Button type="submit" disabled={isJoining}>
                                {isJoining ? '참여 중...' : '참여하기'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
