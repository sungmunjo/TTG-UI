'use client'

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronDown, Video, Users, Settings, LogIn, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export function Header() {
    const router = useRouter();
    const userEmail = useAuthStore((state) => state.userEmail);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <header className="bg-background border-b border-border sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                            <Video className="h-8 w-8 text-primary" />
                            <span className="text-xl font-semibold text-foreground">VirtuMeet</span>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors">
                                <span>제품 </span>
                                <ChevronDown className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Video className="h-4 w-4 mr-2" />
                                    화상회의
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Users className="h-4 w-4 mr-2" />
                                    웨비나
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="h-4 w-4 mr-2" />
                                    가상 배경
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors">
                                <span>솔루션</span>
                                <ChevronDown className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>기업용</DropdownMenuItem>
                                <DropdownMenuItem>교육용</DropdownMenuItem>
                                <DropdownMenuItem>의료용</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <button className="text-foreground hover:text-primary transition-colors">
                            요금제
                        </button>

                        <button className="text-foreground hover:text-primary transition-colors">
                            지원
                        </button>
                    </nav>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        {userEmail ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback>
                                            <User className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem className="text-sm text-muted-foreground" disabled>
                                        {userEmail}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard">대시보드</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>
                                        로그아웃
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link href="/login">
                                    <Button variant="ghost">
                                        <LogIn className="h-4 w-4 mr-2" />
                                        로그인
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button>회원가입</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
