"use client";
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter(); 
    const [message, setMessage] = useState('');
    const searchParams = useSearchParams();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('token', data.token);
                router.push('/dashboard');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Terjadi kesalahan pada server');
            console.error('Error saat login:', error);
        }
    };

    useEffect(() => {
        const messageParam = searchParams.get('message');
        if (messageParam === 'success') {
            setMessage('Registrasi berhasil, akun Anda sedang ditinjau.');
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [searchParams]);
    
    return (
        <div className="relative flex justify-center items-center min-h-screen bg-gray-100 overflow-hidden">
            <div className="absolute top-[-20vh] right-[-30vw] w-[60vw] h-[120vh] bg-custom24 rounded-tl-full rounded-tr-full rounded-br-none shadow-lg z-0"></div>
            <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-700">
                        Belum memiliki akun?{' '}
                        <span
                            onClick={() => router.push('/register')}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Registrasi terlebih dahulu
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
