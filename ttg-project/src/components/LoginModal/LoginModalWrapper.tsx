'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import ModalDialog from '@/components/LoginModal/LoginModalComponents/LoginModal'

export default function ClientWrapper() {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="rounded-md bg-primary px-4 py-2 text-white"
            >
                모달 열기
            </button>
            {open && (
                <ModalDialog
                    open={open}
                    onClose={() => setOpen(false)}
                />
            )}
        </div>
    )
}