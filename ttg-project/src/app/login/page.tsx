import Link from 'next/link';
export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">로그인</h1>
                <form className="space-y-4">
                    <div>
                        <label className="block text-base font-medium mb-1 text-gray-700">이메일</label>
                        <input type="email" className="w-full border rounded px-3 py-2 text-gray-800"/>
                    </div>
                    <div>
                        <label className="block text-base font-medium mb-1 text-gray-700">비밀번호</label>
                        <input type="password" className="w-full border rounded px-3 py-2 text-gray-800"/>
                    </div>
                    <div>
                        <Link href={"./register"} className='block text-base font-normal mb-1 text-right text-blue-600 underline underline-offset-2 decoration-1 hover:cursor-pointer hover:decoration-2 hover:font-bold hover:text-blue-400'>회원가입</Link>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        로그인
                    </button>
                </form>
            </div>
        </div>
    )
}