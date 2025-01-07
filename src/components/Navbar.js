'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../utils/axiosInstance';

const Navbar = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        console.log('Logout button clicked');
        const confirmLogout = window.confirm('Apakah Anda yakin ingin logout?');
        if (!confirmLogout) {
            console.log('Logout cancelled');
            return;
        }

        if (loading) return;

        try {
            setLoading(true);
            const response = await axiosInstance.post('http://localhost:3000/api/auth/logout'); // Panggil API logout

            if (response.status === 200) {
                console.log('Logout success');
                localStorage.removeItem('token');
                router.push('/login');
            } else {
                console.error('Logout failed with status:', response.status);
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-white shadow-md p-4 flex justify-between items-center mb-2 border border-gray-300">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-6">
                <Link href="/dashboard" className="text-sm text-gray-900 hover:text-custom2">
                    Dashboard
                </Link>
                <button
                    onClick={handleClick}
                    className={`px-3 py-1 text-xs bg-slate-600 text-white rounded hover:bg-slate-800 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Logging out...' : 'Logout'}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
