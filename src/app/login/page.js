"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";


export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (data.success) {
                localStorage.setItem("token", data.token);
                router.push("/dashboard");
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("Terjadi kesalahan pada server");
            console.error("Error saat login:", error);
        }
    };

    useEffect(() => {
        const messageFromStorage = localStorage.getItem("registrationMessage");
        if (messageFromStorage) {
            setMessage(messageFromStorage);
            localStorage.removeItem("registrationMessage");
        }
        const timer = setTimeout(() => {
            setMessage("");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative flex justify-center items-center min-h-screen w-screen bg-gray-100 overflow-hidden">
            <div className="absolute top-[-20vh] right-[-30vw] w-[60vw] h-[120vh] bg-custom24 rounded-tl-full rounded-tr-full rounded-br-none shadow-lg z-0"></div>
    
                <div className="relative w-full max-w-md z-10">
                <div className="absolute inset-0 bg-slate-400 rounded-lg shadow-lg transform translate-x-2 translate-y-2"></div>
                <div className="absolute inset-0 bg-white rounded-lg shadow-md"></div>

            {/* Kontainer Login */}
            <div className="bg-white p-20 rounded-lg z-10 relative">
                <h2 className="text-5xl font-bold mb-8 text-center text-blue-600">LOGIN</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                {message && <p className="text-green-500 mb-4 text-center">{message}</p>}
                <form onSubmit={handleLogin} className="flex flex-col items-center">
                    <div className="mb-4 w-4/5">
                        <label htmlFor="username" className="block text-gray-800 text-sm">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="mb-6 w-4/5">
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
                                        <IoEyeSharp className="h-4 w-4" aria-hidden="true" />
                                    )}
                                </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-2/4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-700">
                        Belum memiliki akun?{' '}
                        <span
                            onClick={() => router.push('/register')}
                            className="text-blue-600 hover:underline cursor-pointer"
                        >
                            Registrasi
                        </span>
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
}    