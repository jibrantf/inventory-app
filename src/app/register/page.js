"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('registrationMessage', 'Registrasi berhasil, akun Anda sedang ditinjau.');
                router.replace('/login');
            } else {
                alert(data.message || 'Gagal melakukan registrasi.');
            }
        } catch (error) {
            console.error('Error saat registrasi:', error);
            alert('Terjadi kesalahan pada server.');
        }
    };

    return (
        <div className="relative flex justify-center items-center min-h-screen w-screen bg-gray-100 overflow-hidden">
            <div className="absolute top-[-20vh] right-[-30vw] w-[60vw] h-[120vh] bg-custom24 rounded-tl-full rounded-tr-full rounded-br-none shadow-lg z-0"></div>
            
            {/* Kontainer Bayangan Ganda */}
            <div className="relative w-full max-w-md z-10">
                {/* Bayangan Luar */}
                <div className="absolute inset-0 bg-slate-400 rounded-lg shadow-lg transform translate-x-2 translate-y-2"></div>
                {/* Bayangan Dalam */}
                <div className="absolute inset-0 bg-white rounded-lg shadow-md"></div>

                {/* Kontainer Registrasi */}
                <div className="bg-white p-20 rounded-lg z-10 relative">
                    <h2 className="text-4xl font-bold mb-10 text-center text-blue-600">REGISTER</h2>
                    {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
                    <form onSubmit={handleRegister} className="flex flex-col items-center">
                        <div className="mb-4 w-full">
                            <label htmlFor="username" className="block text-gray-800 text-sm">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className="mb-4 w-full">
                            <label htmlFor="email" className="block text-gray-800 text-sm">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mt-1"
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div className="mb-6 w-full">
                            <label htmlFor="password" className="block text-gray-800 text-sm">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    autoComplete="off"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)} 
                                    className="absolute right-2 top-3 text-gray-600"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="h-4 w-4" aria-hidden="true" />
                                    ) : (
                                        <IoEyeSharp className="h-4 w - **4" aria-hidden="true" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-2/4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
                        >
                            Registrasi
                        </button>
                    </form>
                    <div className="mt-6 text-center text-sm">
                        <p className="text-gray-700">
                            Sudah memiliki akun?{' '}
                            <span
                                onClick={() => router.push('/login')}
                                className="text-blue-600 hover:underline cursor-pointer"
                            >
                                Login
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}