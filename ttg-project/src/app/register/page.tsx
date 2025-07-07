'use client'
import Link from 'next/link';
import React, {useEffect, useState} from 'react'
import useSWRMutation from 'swr/mutation'

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
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">회원가입</h1>
                <form className="space-y-4" onSubmit={registUser}>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">이메일</label>
                        <input
                            type="email"
                            className="w-full border rounded px-3 py-2 text-gray-800"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">비밀번호</label>
                        <input
                            type="password"
                            className="w-full border rounded px-3 py-2 text-gray-800"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">비밀번호 확인</label>
                        <input
                            type="password"
                            className="w-full border rounded px-3 py-2 text-gray-800"
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">이름</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 text-gray-800"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">전화 번호</label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2 text-gray-800"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            required/>
                    </div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">주소</label>
                    <div className="flex">
                        <input
                            type="text"
                            value={address}
                            readOnly
                            className="flex-grow border rounded px-3 py-2"
                        />
                        <button
                            type="button"
                            onClick={openJusoPopup}
                            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            🔍
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        회원가입
                    </button>
                    {message && <p className="text-center text-red-500 text-sm mt-2">{message}</p>}
                </form>
            </div>
        </div>
    );
}
