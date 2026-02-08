'use client'

import React, {useEffect, useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"

export default function Page() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [addressList, setAddressList] = useState<{ id: number; name: string }[]>([])
    const [selectedAddress, setSelectedAddress] = useState<number | null>(null)
    const [address, setAddress] = useState('')



    const openJusoPopup = () => {
        const popup = window.open(
            'register/addressPopup',
            'popupWindow',
            'width=570,height=420, scrollbars=yes, resizable=yes'
        )

        // 팝업과 통신할 콜백 등록
        // window에 callback 함수를 등록
        // window.jusoCallback = function (zipNo: string, roadAddrPart1: string) {
        //     console.log('주소 선택됨:', roadAddrPart1)
        //     setAddress(roadAddrPart1)
        // }
    }

    const registUser = async (e) => {
        e.preventDefault();

        if(password !== confirm){
            setMessage('❌ 비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })

            if (!res.ok) throw new Error('회원가입 실패')

            setMessage('✅ 회원가입 성공!')
        } catch (err) {
            setMessage('에러: ' + (err as Error).message)
        }


    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form className="space-y-4 w-1/4" onSubmit={registUser}>
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center space-y-2">
                        <CardTitle className="text-2xl">회원가입</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-6">

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

                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">비밀번호 확인</Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                placeholder="비밀번호를 다시 입력하세요"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">이름</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="이름을 입력하세요"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            회원가입
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
