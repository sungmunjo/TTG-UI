'use client'

import useSWR, {mutate} from "swr";
import useSWRMutation from 'swr/mutation'
import React, { useState, useEffect } from 'react'
import {SearchParams} from "next/dist/server/request/search-params";

const fetcher = url => fetch(url).then(res => res.json())

export default function AddressSelect() {
    const [selectedSido, setSelectedSido] = useState('')
    const [selectedGu, setSelectedGu] = useState('')
    const [searchAddress, setSearchAddress] = useState('')
    const [selectableAddressList, setSelectableAddressList] = useState<string[]>([])
    const { trigger, data } = useSWRMutation('https://business.juso.go.kr/addrlink/addrLinkApi.do', sendSearch);
    type SearchParam = { keyword: string };
    async function sendSearch(url:string, { arg }:{arg:SearchParam}) {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                confmKey: '',
                currentPage: 1,
                countPerPage: 5,
                keyword: arg.keyword,
                resultType: 'json',
            }),
        });
        const data = await res.json();
        console.log(data);
        return data;
    }

    useEffect(() => {
    })

    const handleSearch = ()=>{
        const test = {keyword: searchAddress};
        trigger(test);
        console.log(searchAddress);
    }
    const onAddressSearchTextKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }


    const handleSidoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        setSelectedSido(e.target.value)
        setSelectedGu('') // 구 초기화
    }

    const handleGuChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGu(e.target.value)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-xl">
                <div className="flex">
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2 text-gray-800"
                        value={searchAddress}
                        onChange={e => setSearchAddress(e.target.value)}
                        onKeyPress={e => onAddressSearchTextKeyDown(e)}>
                    </input>
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        🔍
                    </button>
                </div>
                <table className="border-collapse border-2 border-gray-400 dark:border-gray-500 mt-4 w-full">
                    <thead>
                    <tr>
                        <th className="border border-gray-300 dark:border-gray-600 w-90 bg-indigo-200 text-gray-700">주소</th>
                        <th className="border border-gray-300 dark:border-gray-600 items-center bg-indigo-200 text-gray-700">우편 번호</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="border border-gray-300 dark:border-gray-700 px-2">Indiana</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-2 text-center">Indianapolis</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 dark:border-gray-700 px-2">Ohio</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-2 text-center">Columbus</td>
                    </tr>
                    <tr>
                        <td className="border border-gray-300 dark:border-gray-700 px-2">Michigan</td>
                        <td className="border border-gray-300 dark:border-gray-700 px-2 text-center">Detroit</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}