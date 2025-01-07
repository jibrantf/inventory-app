"use client";

import './globals.css';
import { usePathname } from 'next/navigation';
import React, { Suspense } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const isAuthPage = pathname === '/login' || pathname === '/register';

    return (
        <html lang="en">
            <body className="flex bg-gray-200 h-screen">
                <Suspense fallback={<div>Loading Sidebar...</div>}>
                    {!isAuthPage && <Sidebar />}
                </Suspense>
                <div className={`flex-1 h-screen ${isAuthPage ? 'flex items-center justify-center' : 'ml-64 p-6 overflow-y-auto'}`}>
                    <Suspense fallback={<div>Loading Navbar...</div>}>
                        {!isAuthPage && <Navbar />}
                    </Suspense>
                    {children || <div>Loading Page...</div>}
                </div>
                
            </body>
        </html>
    );
}

