'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../components/AuthProvider';

export default function TestPage() {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Ładowanie...</div>;
    }

    if (!isAuthenticated) {
        return null; // Nie renderuj nic, przekierowanie nastąpi w useEffect
    }

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto my-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Strona Testowa</h1>
                <p className="text-lg mb-4 text-gray-600 text-black">
                    Ta strona jest dostępna tylko dla zalogowanych użytkowników.
                </p>
                <div className="bg-primary-50 p-4 rounded-lg border border-primary-200 mt-6">
                    <p className="text-primary-700 text-black">
                        Widzisz tę stronę, ponieważ jesteś zalogowany. Gratulacje!
                    </p>
                </div>
            </div>
        </div>
    );
}