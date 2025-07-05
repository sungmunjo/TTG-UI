'use client'

import useSWR, {mutate} from "swr";
import React, { useState, useEffect } from 'react'

const fetcher = url => fetch(url).then(res => res.json())

export default function AddressSelect() {
    const [selectedSido, setSelectedSido] = useState('')
    const [selectedGu, setSelectedGu] = useState('')
    const [searchAddress, setSearchAddress] = useState('')
    const [selectableAddressList, setSelectableAddressList] = useState<string[]>([])
    const { data, error } = useSWR('/api/user', fetcher,{
        revalidateOnMount: false,
    })



    useEffect(() => {
    })

    const searchAddressChange = (value) =>{
        setSearchAddress(value);
        mutate('/api/user')

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
            <input
                type="text"
                className="w-full border rounded px-3 py-2 text-gray-800"
                value={searchAddress}
                onChange={e => searchAddressChange(e.target.value)}>
            </input>
        </div>
    )
}